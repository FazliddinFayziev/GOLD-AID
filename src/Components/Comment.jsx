import React from 'react';

const Comment = ({ comment }) => {
    return (
        <>
            <div className="comment">
                <div className='avatar-container'>
                    <img src="https://res.cloudinary.com/dcrolfqsj/image/upload/v1680439165/profile-removebg-preview_dqc1pn.png" alt="user avatar" className="avatar" />
                </div>
                <div className="details">
                    <div className="name">Fazliddin</div>
                    <div className="comment-text">{comment}</div>
                </div>
            </div>
        </>
    );
};

export default Comment;