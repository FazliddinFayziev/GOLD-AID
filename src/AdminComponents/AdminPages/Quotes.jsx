import React, { useEffect, useState } from 'react';
import "../../css/AdminCSS/quotes.css";
import UploadQuotes from '../UploadQuotes';
import AllQuotes from '../AllQuotes';
import { useGlobalContext } from '../../context/context';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { GiArchiveResearch } from "react-icons/gi";

const Quotes = () => {

    const { refreshAccessToken, isAccessTokenExpired, user } = useGlobalContext();
    const { accessToken } = user;
    const [isLoading, setIsLoading] = useState(true);
    const [showCard, setShowCard] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [quotes, setQuotes] = useState([]);
    const [getIdOfQuote, setGetIdOfQuote] = useState('');
    const [showEditCard, setShowEditCard] = useState(false);
    const navigate = useNavigate();

    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

        const fetchQuotes = async (token) => {
            try {
                const res = await axios.get('/admin/quotes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                const { quotes } = res.data
                setQuotes(quotes);
                setIsLoading(false);
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchQuotes(refreshedToken); // try the request again with the new token
                } else {
                    console.log(err);
                }
            }
        };

        useEffect(() => {
            const fetch = async () => {
                const token = await refreshAccessToken();
                if (!token) {
                    navigate('/register');
                } else {
                    await fetchQuotes(token);
                }
            };
            fetch();
        }, [refetch]);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchQuotes(token))
                    .catch((err) => console.log(err));
            }, 3000000); // fetches new urls and tokens every 50 minutes
            return () => clearInterval(timer);
        }, []);

        useEffect(() => {
            if (!refreshToken || !accessTokenExpireTime) {
                navigate('/register');
            }
            else if (isAccessTokenExpired()) {
                navigate('/login');
            }
        }, []);

        return accessToken;
    };


    const getAccess = useToken();

    // Set ShowCard false after 5 second
    useEffect(() => {
        setTimeout(() => setErrorMsg(''), 10000);
    }, [errorMsg]);



    // DELETE QUOTE

    const DeleteQuote = async (token) => {
        setIsLoading(true)
        try {
            const res = await axios.delete(`/admin/quotes/${getIdOfQuote}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully Deleted ! ! !');
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                DeleteQuote(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err)
                setIsLoading(false)
            }
        }
    };


    const handleDeleteQuote = () => {
        DeleteQuote(accessToken)
        setShowCard(false)
        setRefetch(!refetch)
    }

    return (
        <>
            {
                showCard && (
                    <div className='delete-quote-overlay'>
                        <div className='delete-quote-card'>
                            <h3>Are you sure you want to delete this Quote?</h3>
                            <div className='quote-buttons'>
                                <button className='quote-delete-button' onClick={handleDeleteQuote}>Yes</button>
                                <button className='cancel-quote-delete-button' onClick={() => setShowCard(false)}>No</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className='admin-quotes'>
                <div className='start-quotes'>
                    Quotes
                </div>
                <div className={errorMsg === 'Successfully uploaded ! ! !' ? 'add-lesson-add-error-green' : 'add-lesson-add-error'}>
                    {errorMsg}
                </div>
                <UploadQuotes
                    setIsLoading={setIsLoading}
                    setErrorMsg={setErrorMsg}
                    refetch={refetch}
                    setRefetch={setRefetch}
                    showEditCard={showEditCard}
                    setShowEditCard={setShowEditCard}
                    getIdOfQuote={getIdOfQuote}
                />
                {
                    isLoading ? (
                        <div className='loading-users'>
                            <div className="loading-circle-user"></div>
                        </div>
                    ) : (
                        quotes.length === 0 ? (
                            <div className='no-quotes'>
                                <div>
                                    <div className='no-quote-icon'>
                                        <GiArchiveResearch fontSize={100} />
                                    </div>
                                    There are no Quotes
                                </div>
                            </div>
                        ) : (
                            <div className='quotes-scroll'>
                                <div className='all-quotes-cards-container'>
                                    {
                                        quotes.map((quote) => {
                                            return <AllQuotes
                                                key={quote._id}
                                                {...quote}
                                                setGetIdOfQuote={setGetIdOfQuote}
                                                setShowEditCard={setShowEditCard}
                                                setShowCard={setShowCard}
                                            />
                                        })
                                    }
                                </div>
                            </div>
                        )
                    )
                }
            </div >
        </>
    )
}

export default Quotes