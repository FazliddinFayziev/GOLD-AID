import Comment from './Comment';
import "../css/VideosCSS/comment.css"
import React, { useState, useEffect, useRef } from 'react';
import { IoMdSend } from "react-icons/io"
import { useGlobalContext } from '../context/context';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const CommentSection = () => {
    // GLOBAL
    const { bgColor, comments, changeComment, setChangeComment, refreshAccessToken, user, limSkipComments, setLimSkipComments, scrollLoading, setScrollLoading } = useGlobalContext();

    const { Allcomments } = comments
    // LOCAL
    const [comment, setComment] = useState('');
    const [lengthMessage, setLengthMessage] = useState('')
    const { lessonId } = useParams();

    // Comment Scroll logic
    const commentContainerRef = useRef(null);

    const { accessToken } = user;

    // ADD COMMENTS
    const AddComment = async () => {
        try {
            const res = await axios.post(`/lessons/comments/${lessonId}`, {
                commentText: comment
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(res.data);
        } catch (err) {
            if (err && err.response && err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                AddComment(refreshedToken); // try the request again with the new token
            } else {
                console.log(err);
            }
        }
    }

    // SUBMITING THE COMMENT
    const handleSubmit = (e) => {
        e.preventDefault()
        if (comment === "") {
            setLengthMessage('Add Comment...')
        } else if (comment.split('').length >= 60) {
            setLengthMessage('No more than 60 letters...')
        } else {
            AddComment()
            setComment('')
            setChangeComment(!changeComment)
        }
    }


    // Handle Scroll Logic
    const handleScroll = () => {
        const commentContainer = commentContainerRef.current;
        if (commentContainer) {
            const scrollTop = commentContainer.scrollTop;
            const scrollHeight = commentContainer.scrollHeight;
            const clientHeight = commentContainer.clientHeight;
            const top = Math.floor(scrollTop + 1)
            if (top + clientHeight >= scrollHeight) {
                console.log('User has reached the end');
                setScrollLoading(true)
                setLimSkipComments({ lim: 15, skip: 0 })
                setChangeComment(!changeComment)
                // setScrollLoading(false)
            }
        }
    };


    return (
        <>
            <div className='files-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Comments</h1>
            </div>
            <p className='add-comment'>{lengthMessage}</p>
            <div className='comment-container-form'>
                <form onSubmit={handleSubmit} className='comment-input'>
                    <input
                        type='text'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Type your comment here...'
                    />
                    <button type='submit' className='comment-send'>
                        <IoMdSend className='comment-send-icon' fontSize={30} />
                    </button>
                </form>
            </div>
            <div className='comment-container' ref={commentContainerRef} onScroll={handleScroll}>
                {Allcomments && Allcomments.length === 0 ? (
                    <div className='no-comment'>
                        <p className={bgColor ? 'white' : 'black'}>No Comments yet...</p>
                    </div>
                ) : (
                    <>
                        <div className='comment-section'>
                            {Allcomments?.map((text, index) => (
                                <Comment key={index} {...text} />
                            ))}
                        </div>

                        {
                            scrollLoading && (
                                <div className="loading-scroll-container">
                                    <div className="loading-scroll-spinner"></div>
                                </div>
                            )
                        }
                    </>
                )}
            </div>
        </>
    );






}

export default CommentSection
