import React, { useEffect, useState } from 'react';
import { profile } from '../assets';
import { useGlobalContext } from '../context/context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { IoIosArrowBack } from "react-icons/io";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";

const SingleUser = () => {

    const { refreshAccessToken, isAccessTokenExpired, user } = useGlobalContext();
    const { userId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [singleUser, setSingleUser] = useState([]);
    const [refetchUserInfo, setRefetchUserInfo] = useState(false);


    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

        const fetchSingleUser = async (token) => {
            try {
                const res = await axios.get(`admin/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                const { user } = res.data;
                setSingleUser(user);
                setIsLoading(false);
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchSingleUser(refreshedToken); // try the request again with the new token
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
                    await fetchSingleUser(token);
                }
            };
            fetch();
        }, [refetchUserInfo]);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchSingleUser(token))
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


    const { accessToken } = user;

    const CanCommentFunction = async (token) => {
        try {
            const res = await axios.patch(`/admin/users/edit/comment/permission/${userId}`, {
                userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                CanCommentFunction(refreshedToken); // try the request again with the new token
            } else {
                console.log(err);
            }
        }
    };

    const getAccess = useToken();

    const handleCanComment = () => {
        CanCommentFunction(accessToken)
        setRefetchUserInfo(!refetchUserInfo)
        setIsLoading(true)
    }

    const { name, gender, course, email, age, canComment, progressScore, isActive, isAdmin, profilePicture, isEmailSent, isVerified, attemptsToUpdatePassword } = singleUser

    return (
        <>
            {
                isLoading ? (
                    <div className='loading-users'>
                        <div className="loading-circle-user"></div>
                    </div>
                ) : (
                    <>
                        <Link style={{ textDecoration: 'none', color: '#000' }} to={'/admin/users'}>
                            <div className='back-to-user-page'>
                                <IoIosArrowBack className='back-user' />
                            </div>
                        </Link>
                        <div className='single-user-container'>
                            <div className='user-holder'>
                                <div className='user-main-holder'>
                                    <div className='single-user-image'>
                                        <img
                                            src={profilePicture ? profilePicture : profile}
                                            alt='gold-aid-profile-image'
                                            onError={(e) => {
                                                e.target.onerror = null; // Prevent infinite loop if the default image also fails to load
                                                e.target.src = profile; // Display the default profile image
                                            }} />
                                    </div>
                                    <div className='single-user-image-box'>
                                        <h4>{name}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className='table-container'>
                                <div className="table">

                                    <div className="term">Name</div>
                                    <div className="desc">{name}</div>

                                    <div className="term">Email</div>
                                    <div className="desc">{email}</div>

                                    <div className="term">Age</div>
                                    <div className="desc">{age}</div>

                                    <div className="term">canComment</div>
                                    <div className="desc">{canComment ? "true" : "false"} {
                                        refetchUserInfo ?
                                            <button onClick={handleCanComment} className='block-user'><AiFillLock /></button>
                                            : <button onClick={handleCanComment} className='unblock-user'><AiFillUnlock /></button>
                                    }</div>

                                    <div className="term">course</div>
                                    <div className="desc">{course}</div>

                                    <div className="term">progressScore</div>
                                    <div className="desc">{progressScore}</div>

                                    <div className="term">Gender</div>
                                    <div className="desc">{gender}</div>

                                    <div className="term">isActive</div>
                                    <div className="desc">{isActive ? "true" : "false"}</div>

                                    <div className="term">isAdmin</div>
                                    <div className="desc">{isAdmin ? "true" : "false"}</div>

                                    <div className="term">isEmailSent</div>
                                    <div className="desc">{isEmailSent ? "true" : "false"}</div>

                                    <div className="term">isVerified</div>
                                    <div className="desc">{isVerified ? "true" : "false"}</div>

                                    <div className="term">password attempts</div>
                                    <div className="desc">{attemptsToUpdatePassword}</div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default SingleUser