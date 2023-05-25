import React, { useEffect, useState } from 'react';
import { AddLesson, AdminAvatars, AdminLessons, AdminLevels, Dashboard, Menu, Quotes, SideBar, SingleAdminLessonPage, SingleUser, Users } from '../../AdminComponents'
import { useGlobalContext } from '../../context/context'
import { DashboardTypes } from '../../context/DashboardPathNames';
import { NotAlailable } from '..';
import axios from '../../api/axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Loading } from '../../Components';


const Admin = () => {
    const { dashboardElement, user, refreshAccessToken, isAccessTokenExpired, adminUser, setAdminUser, getDashInfo, setGetDashInfo } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const refreshToken = localStorage.getItem('refreshToken');


    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

        const fetchDashboardInfo = async (token) => {
            try {
                const res = await axios.get('/admin/stats', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                const { admin } = res.data
                setAdminUser(admin)
                setGetDashInfo(res.data);
                setIsLoading(false);
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchDashboardInfo(refreshedToken); // try the request again with the new token
                } else if (err.response.status === 401) {
                    navigate('/')
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
                    await fetchDashboardInfo(token);
                }
            };
            fetch();
        }, []);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchDashboardInfo(token))
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

    if (isLoading) {
        return <Loading />
    }


    if (!accessToken) {
        return <Loading /> // Render loading spinner
    }

    if (!refreshToken) {
        navigate('register')
    }




    return (
        <>
            <div className='media-admin-pannel'>
                <SideBar />
                <Menu />
                <div className="admin-content">
                    <Routes>

                        {/* Main Routes */}
                        <Route path="/" element={<Dashboard />} />
                        <Route path="courses" element={<AdminLevels />} />
                        <Route path="add-lesson" element={<AddLesson />} />
                        <Route path="users" element={<Users />} />
                        <Route path="quotes" element={<Quotes />} />
                        <Route path="avatars" element={<AdminAvatars />} />

                        {/* Second-page routes */}
                        <Route path='users/:userId' element={<SingleUser />} />
                        <Route path='courses/:courseName' element={<AdminLessons />} />
                        <Route path='courses/:courseName/:lessonId' element={<SingleAdminLessonPage />} />

                    </Routes>
                </div>
            </div>

            {/* MEDIA SCREEN */}
            <div className='media-error'>
                <NotAlailable />
            </div>
        </>
    )
}

export default Admin
