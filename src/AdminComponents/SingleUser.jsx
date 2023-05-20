import React, { useEffect, useState } from 'react';
import { profile } from '../assets';
import { useGlobalContext } from '../context/context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { IoIosArrowBack } from "react-icons/io";

const SingleUser = () => {

    const { refreshAccessToken, isAccessTokenExpired, user } = useGlobalContext();
    const { userId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [singleUser, setSingleUser] = useState([]);


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
        }, []);

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

    const accessToken = useToken();

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
                                <div class="table">

                                    <div class="term">Name</div>
                                    <div class="desc">{name}</div>

                                    <div class="term">Email</div>
                                    <div class="desc">{email}</div>

                                    <div class="term">Age</div>
                                    <div class="desc">{age}</div>

                                    <div class="term">canComment</div>
                                    <div class="desc">{canComment ? "true" : "false"}</div>

                                    <div class="term">course</div>
                                    <div class="desc">{course}</div>

                                    <div class="term">progressScore</div>
                                    <div class="desc">{progressScore}</div>

                                    <div class="term">Gender</div>
                                    <div class="desc">{gender}</div>

                                    <div class="term">isActive</div>
                                    <div class="desc">{isActive ? "true" : "false"}</div>

                                    <div class="term">isAdmin</div>
                                    <div class="desc">{isAdmin ? "true" : "false"}</div>

                                    <div class="term">isEmailSent</div>
                                    <div class="desc">{isEmailSent ? "true" : "false"}</div>

                                    <div class="term">isVerified</div>
                                    <div class="desc">{isVerified ? "true" : "false"}</div>

                                    <div class="term">password attempts</div>
                                    <div class="desc">{attemptsToUpdatePassword}</div>
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