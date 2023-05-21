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
    const [isLoading, setIsLoading] = useState(true);
    const [quotes, setQuotes] = useState([]);
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
        }, []);

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


    const accessToken = useToken();

    return (
        <>
            <div className='admin-quotes'>
                <div className='start-quotes'>
                    Courses
                </div>
                <UploadQuotes />
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
                                    There is no Quotes
                                </div>
                            </div>
                        ) : (
                            <div className='quotes-scroll'>
                                <div className='all-quotes-cards-container'>
                                    {
                                        quotes.map((quote) => {
                                            return <AllQuotes key={quote._id} {...quote} />
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