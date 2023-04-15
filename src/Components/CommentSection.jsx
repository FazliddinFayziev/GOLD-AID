import React, { useState } from 'react';
import "../css/VideosCSS/comment.css"
import Comment from './Comment';
import { useGlobalContext } from '../context/context';

const CommentSection = () => {
    const { bgColor } = useGlobalContext();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newComment !== '') {
            setComments([...comments, { author: 'You', text: newComment }]);
            setNewComment('');
        }
    };

    return (
        <>
            <div className='files-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Comments</h1>
            </div>
            <div className="comment-section">
                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <Comment key={index} author={comment.author} text={comment.text} />
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
                <form className='comment-input' onSubmit={handleSubmit}>
                    <input onChange={(event) => setNewComment(event.target.value)} type="text" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default CommentSection
