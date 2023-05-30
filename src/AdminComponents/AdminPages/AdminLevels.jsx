import React, { useEffect, useState } from 'react';
import "../../css/AdminCSS/adminCourse.css";
import CourseAdminCard from '../CourseAdminCard';
import { useGlobalContext } from '../../context/context';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { level_default, level_default_ielts } from '../../assets';


const AdminLevels = () => {

    const { user, refreshAccessToken, isRefreshTokenExpired, changeAdminCourse } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();



    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshTokenExpireTime = localStorage.getItem('refreshTokenExpireTime');

        const fetchCourses = async (token) => {
            try {
                const res = await axios.get('/courses', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                const { courses } = res.data;
                const newArr = courses.map((course) => {
                    const {
                        _id,
                        name,
                        coursePicture,
                        minScore,
                        isCompleted,
                    } = course;
                    return {
                        id: _id,
                        name: name,
                        coursePicture: level_default,
                        ieltsPicture: level_default_ielts,
                        minScore: minScore,
                        isCompleted: isCompleted,
                    };
                });
                setCourses(newArr);
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
        }, [changeAdminCourse]);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchCourses(token))
                    .catch((err) => console.log(err));
            }, 3000000); // fetches new urls and tokens every 50 minutes
            return () => clearInterval(timer);
        }, []);

        useEffect(() => {
            if (!refreshToken || !refreshTokenExpireTime) {
                navigate('/register');
            }
            else if (isRefreshTokenExpired()) {
                navigate('/login');
            }
        }, []);

        return accessToken;
    };


    const accessToken = useToken();


    return (
        <>
            <div className='admin-courses'>
                <div className='start-dashboard'>
                    Courses
                </div>
                {
                    isLoading ? (
                        <div className='loading-users'>
                            <div className="loading-circle-user"></div>
                        </div>
                    ) : (
                        <div className='admin-courses-card'>
                            {
                                courses.map((course, index) => {
                                    return <CourseAdminCard key={index} {...course} />
                                })
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default AdminLevels
