import React, { useEffect, useState } from 'react';
import { AiFillLike, AiOutlineLike, AiOutlineDislike, AiFillDislike } from 'react-icons/ai';
import { ImBin } from "react-icons/im";
import '../css/OtherCSS/loading.css';
import { useGlobalContext } from '../context/context';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

const Comment = ({ comment, likes, dislikes, id, userPicture, username, useremail }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [commentDelete, setCommentDelete] = useState(false);
    const [deletedMessage, setDeletedMessage] = useState('')
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const { refreshAccessToken, isAccessTokenExpired, user, changeComment, setChangeComment, userProfile } = useGlobalContext();
    const { _id, email, profilePicture, progressScore, completedCourses, course } = userProfile


    const { accessToken } = user;

    // LIKE COMMENTS
    const likeComment = async (commentId) => {
        try {
            const res = await axios.patch(`/lessons/comments/like/?commentId=${commentId}&lessonId=${lessonId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(res.data);
            setDeletedMessage(res.data.msg)
        } catch (err) {
            if (err && err.response && err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                likeComment(refreshedToken); // try the request again with the new token
            } else {
                console.log(err);
            }
        }
    };

    // DELETE COMMENTS
    const deleteComment = async (commentId) => {
        try {
            const res = await axios.delete(`/lessons/comments/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(res.data);

        } catch (err) {
            if (err && err.response && err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                likeComment(refreshedToken); // try the request again with the new token
            } else {
                console.log(err);
            }
        }
    }

    // Set to false
    useEffect(() => {
        if (deletedMessage === "comment has been deleted successfuly") {
            setCommentDelete(false);
        }
    }, [commentDelete]);

    const handleDelete = () => {
        deleteComment(id)
        setChangeComment(!changeComment)
        setCommentDelete(true)
    }

    const handleLike = () => {
        setLiked(!liked);
        likeComment(id);
    };

    console.log(userProfile)

    return (
        <div key={id} className="comment-single-container">
            <div className="comment">
                <div className="avatar-container">
                    <img src={userPicture} alt="user avatar" className="avatar" />
                </div>
                <div className="details">
                    <div className="name">{username}</div>
                    <div className="comment-text">{comment}</div>
                </div>
            </div>
            <div className="likes-container">
                <div>
                    <div className="likes" onClick={handleLike}>
                        {liked ? <AiFillLike /> : <AiOutlineLike />}
                    </div>
                    <p className="likes-count">{!likes ? 0 : likes}</p>
                </div>
                <div>
                    <div
                        className="likes"
                        onClick={() => setDisliked(!disliked)}
                    >
                        {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
                    </div>
                    <p className="likes-count">{!dislikes ? 0 : dislikes}</p>
                </div>
                <div>
                    {email === useremail && (
                        <div
                            className="likes"
                            onClick={handleDelete}
                        >
                            {
                                commentDelete ? (
                                    <div className="loading-icon-container">
                                        <div className="loading-icon-spinner"></div>
                                    </div>
                                ) : (
                                    <ImBin color='red' fontSize={15} />
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;
