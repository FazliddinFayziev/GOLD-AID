import Comment from './Comment';
import "../css/VideosCSS/comment.css"
import React, { useState } from 'react';
import { IoMdSend } from "react-icons/io"
import { useGlobalContext } from '../context/context';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const CommentSection = () => {
    // GLOBAL
    const { bgColor, comments, changeComment, setChangeComment, refreshAccessToken, user } = useGlobalContext();

    // LOCAL
    const [comment, setComment] = useState('');
    const [lengthMessage, setLengthMessage] = useState('Hello Wolrd')
    const { lessonId } = useParams();

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
        if (comment !== "") {
            AddComment()
            setComment('')
            setChangeComment(!changeComment)
        } else if (comment.length >= 60) {

        }
    }

    return (
        <>
            <div className='files-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Comments</h1>
            </div>
            <div className='comment-container'>
                <form onSubmit={handleSubmit} className='comment-input'>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Type your comment here...'
                    />
                    <button type='submit' className='comment-send'>
                        <IoMdSend className='comment-send-icon' fontSize={30} />
                    </button>
                </form>
                {
                    comments.length === 0 ? (
                        <div className='no-comment'>
                            <p className={bgColor ? 'white' : 'black'}>No Comments yet...</p>
                        </div>
                    ) : (
                        <div className="comment-section">
                            {comments.map((text, index) => (
                                <Comment key={index} {...text} />
                            ))}
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default CommentSection
