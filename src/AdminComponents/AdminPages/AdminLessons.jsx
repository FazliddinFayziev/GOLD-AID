import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/context';
import axios from '../../api/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../css/AdminCSS/adminLesson.css';
import AdminLessonCard from '../AdminLessonCard';
import { IoIosArrowBack } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";


const AdminLessons = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { courseName } = useParams();
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    const { user, refreshAccessToken, isAccessTokenExpired } = useGlobalContext();

    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

        const fetchLessons = async (token) => {
            try {
                const res = await axios.get(`/lessons/${courseName}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                const { lessons } = res.data;
                setLessons(lessons);
                setIsLoading(false);
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchLessons(refreshedToken); // try the request again with the new token
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
                    await fetchLessons(token);
                }
            };
            fetch();
        }, []);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchLessons(token))
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
    useEffect(() => {
        console.log(lessons)
    }, [lessons])



    return (
        <div className='admin-lesson'>
            <div className='start-dashboard'>
                All Lessons
            </div>
            {
                isLoading ? (
                    <div className='loading-users'>
                        <div className="loading-circle-user"></div>
                    </div>
                ) : (
                    <>
                        <Link to={'/admin/courses'}>
                            <div className='admin-lesson-card-back'>
                                <IoIosArrowBack className='back-to-courses' />
                            </div>
                        </Link>
                        <div className='admin-lesson-card-container'>
                            {
                                isLoading ? (
                                    <div className='loading-users'>
                                        <div className="loading-circle-user"></div>
                                    </div>
                                ) : (
                                    lessons.length === 0 ? (
                                        <>
                                            <div className='no-lesson-admin'>
                                                <div>
                                                    <div className='no-lesson-admin-icon'>
                                                        <BiSearchAlt fontSize={100} />
                                                    </div>
                                                    There is no Lessons
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='admin-lesson-card'>
                                            {
                                                lessons.map((lesson, index) => {
                                                    return <AdminLessonCard key={lesson.lessonId} {...lesson} index={index} />
                                                })
                                            }
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default AdminLessons