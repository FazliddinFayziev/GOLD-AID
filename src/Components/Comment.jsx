import React, { useEffect, useState } from 'react';
import { AiFillLike, AiOutlineLike, AiOutlineDislike, AiFillDislike } from 'react-icons/ai';
import { ImBin } from "react-icons/im";
import '../css/OtherCSS/loading.css';
import { useGlobalContext } from '../context/context';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

const Comment = ({ comment, likes, disLikes, id, userPicture, username, useremail }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [commentDelete, setCommentDelete] = useState(false);
    const [deletedMessage, setDeletedMessage] = useState('');
    const [deleteId, setDeleteId] = useState('')
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const { refreshAccessToken, comments, singleLesson, isAccessTokenExpired, user, changeComment, setChangeComment, userProfile } = useGlobalContext();
    const { _id, email, profilePicture, progressScore, completedCourses, course } = userProfile
    const { userId } = singleLesson
    const { CommentsUserId } = comments


    const { accessToken } = user;

    useEffect(() => {
        console.log(deleteId)
    }, [deleteId])

    // LIKE COMMENTS
    const likeComment = async () => {
        try {
            const res = await axios.patch(
                `/lessons/comments/like/?commentId=${id}&lessonId=${lessonId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(res.data);
            console.log('Function ID', id);
        } catch (err) {
            if (
                err &&
                err.response &&
                err.response.status === 400 &&
                err.response.data.message === "token is expired"
            ) {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                likeComment(refreshedToken); // try the request again with the new token
            } else {
                console.log(err);
            }
        }
    };

    // DIS-LIKE COMMENTS
    const disLikeComment = async () => {
        try {
            const res = await axios.patch(
                `/lessons/comments/dislike/?commentId=${id}&lessonId=${lessonId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(res.data);
            console.log('Function ID', id);
        } catch (err) {
            if (
                err &&
                err.response &&
                err.response.status === 400 &&
                err.response.data.message === "token is expired"
            ) {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                disLikeComment(refreshedToken); // try the request again with the new token
            } else {
                console.log(err);
            }
        }
    };


    // DELETE COMMENTS
    const deleteComment = async () => {
        try {
            const res = await axios.delete(`/lessons/comments/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(res.data);
            setDeletedMessage(res.data.msg);
        } catch (err) {
            if (
                err &&
                err.response &&
                err.response.status === 400 &&
                err.response.data.message === "token is expired"
            ) {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                deleteComment(refreshedToken); // try the request again with the new token
            } else {
                console.log(err);
            }
        }
    };

    // 645a768375d48ae5e120a929

    // Set to false
    useEffect(() => {
        if (deletedMessage === "comment has been deleted successfuly") {
            setCommentDelete(false);
        }
    }, [commentDelete]);

    // DELETE COMMENT FUNCTION
    const handleDelete = () => {
        deleteComment()
        setChangeComment(!changeComment)
        setCommentDelete(true)
    }

    // LIKE COMMENT FUNCTION
    const handleLike = () => {
        // color of buttons
        setLiked(true);
        setDisliked(false);

        // Like Function
        likeComment();

        // refresh (fetch) the comments again for update everything in real time
        setChangeComment(!changeComment)
    };

    // DIS-LIKE COMMENT FUNCTION
    const handleDisLike = () => {
        setDisliked(true);
        setLiked(false);
        disLikeComment();
        setChangeComment(!changeComment)
    };

    // console.log(userProfile)

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

                {userId !== CommentsUserId && (
                    <>
                        <div>
                            <div className="likes" onClick={handleLike}>
                                {liked ? <AiFillLike /> : <AiOutlineLike />}
                            </div>
                            <p className="likes-count">{!likes ? 0 : likes}</p>
                        </div>



                        <div>
                            <div
                                className="likes" onClick={handleDisLike}
                            >
                                {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
                            </div>
                            <p className="likes-count">{!disLikes ? 0 : disLikes}</p>
                        </div>
                    </>
                )}



                <div>
                    {userId === CommentsUserId && (
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
