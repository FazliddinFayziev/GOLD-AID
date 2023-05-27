import React, { useState } from 'react';
import { useGlobalContext } from '../context/context';
import axios from '../api/axios';

const UploadQuotes = ({ setIsLoading, setErrorMsg, refetch, setRefetch, showEditCard, setShowEditCard, getIdOfQuote }) => {
    const { user, refreshAccessToken } = useGlobalContext();
    const { accessToken } = user;
    const [allQuote, setAllQuote] = useState('');
    const [author, setAuthor] = useState('');


    // POST QUOTE ======================================>

    const PostQuote = async (token) => {
        setIsLoading(true)
        try {
            const res = await axios.post('/admin/quotes', {
                quote: allQuote,
                author: author
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setAllQuote('');
            setAuthor('');
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                PostQuote(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err)
                setIsLoading(false)
            }
        }
    };


    const handleAddQuote = () => {
        PostQuote(accessToken)
        setRefetch(!refetch)
    }


    // EDIT QUOTE ================================================>

    const EditQuote = async (token) => {
        setIsLoading(true)
        try {
            const res = await axios.patch(`/admin/quotes/${getIdOfQuote}`, {
                quote: allQuote,
                author: author
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setAllQuote('');
            setAuthor('');
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                EditQuote(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err)
                setIsLoading(false)
            }
        }
    };


    const handleEditQuote = () => {
        EditQuote(accessToken)
        setShowEditCard(false)
        setRefetch(!refetch)
    }





    return (
        <>
            <div className='upload-quotes'>
                <h4>Upload Quote</h4>
                <div className='upload-quote-container-box'>
                    <div className='upload-quote-box'>
                        <div className='upload-quotes-container'>
                            <h3>Quote:</h3>
                            <input value={allQuote} onChange={(e) => setAllQuote(e.target.value)} type="text" placeholder='Quote...' />
                        </div>
                        <div className='upload-quotes-container'>
                            <h3>Author:</h3>
                            <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" placeholder='Author...' />
                        </div>
                        <div className='upload-quote'>
                            <button onClick={handleAddQuote}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* EDIT CARD OF MY QUOTES */}
            {showEditCard && (
                <div className='delete-quote-overlay'>
                    <div className='delete-quote-card'>
                        <h4>Edit Quote</h4>
                        <div className='upload-quote-container-box'>
                            <div className='upload-quote-box'>
                                <div className='upload-quotes-container'>
                                    <h3>Quote:</h3>
                                    <input value={allQuote} onChange={(e) => setAllQuote(e.target.value)} type="text" placeholder='Quote...' />
                                </div>
                                <div className='upload-quotes-container'>
                                    <h3>Author:</h3>
                                    <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" placeholder='Author...' />
                                </div>
                                <div className='upload-quote'>
                                    <button onClick={handleEditQuote}>Edit</button>
                                </div>
                                <div className='go-back-quote'>
                                    <button onClick={() => setShowEditCard(false)}>Go Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UploadQuotes