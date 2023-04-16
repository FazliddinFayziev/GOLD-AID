import Comment from './Comment';
import "../css/VideosCSS/comment.css"
import React, { useState } from 'react';
import { IoMdSend } from "react-icons/io"
import { useGlobalContext } from '../context/context';

const CommentSection = () => {

    // GLOBAL
    const { bgColor } = useGlobalContext();

    // LOCAL
    const [message, setMessage] = useState([]);
    const [comment, setComment] = useState('')

    // SUBMITING THE COMMENT
    const handleSubmit = (e) => {
        e.preventDefault()
        if (comment !== "") {
            setMessage([...message, { comment }]);
            setComment('')
        }
    }

    return (
        <>
            <div className='files-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Comments</h1>
            </div>
            <div className='comment-container'>
                {
                    message.length === 0 ? (
                        <div className='no-comment'>
                            <p className={bgColor ? 'white' : 'black'}>No Comments yet...</p>
                        </div>
                    ) : (
                        <div className="comment-section">
                            {message.map((text, index) => (
                                <Comment key={index} {...text} />
                            ))}
                        </div>
                    )
                }
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
            </div>
        </>
    )
}

export default CommentSection
