import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/context';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import '../../css/AdminCSS/adminLesson.css';
import AdminLessonCard from '../AdminLessonCard';


const AdminLessons = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    const { user, refreshAccessToken, isAccessTokenExpired } = useGlobalContext();

    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

        const fetchCourses = async (token) => {
            try {
                const res = await axios.get('/lessons/beginner', {
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
                    fetchCourses(refreshedToken); // try the request again with the new token
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
                    await fetchCourses(token);
                }
            };
            fetch();
        }, []);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchCourses(token))
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



    return (
        <div className='admin-lesson'>
            <div className='start-dashboard'>
                Levels
            </div>
            {
                isLoading ? (
                    <div className='loading-users'>
                        <div className="loading-circle-user"></div>
                    </div>
                ) : (
                    <div className='admin-lesson-card'>
                        {
                            lessons.map((lesson) => {
                                return <AdminLessonCard key={lesson.lessonId} {...lesson} />
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default AdminLessons