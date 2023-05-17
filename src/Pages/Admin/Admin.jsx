import React, { useEffect, useState } from 'react';
import { AddLesson, AdminLevels, AdminVideos, Dashboard, Documents, Menu, Settings, SideBar, Users } from '../../AdminComponents'
import { useGlobalContext } from '../../context/context'
import { DashboardTypes } from '../../context/DashboardPathNames';
import { NotAlailable } from '..';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../Components';

const Admin = () => {
    const { dashboardElement, user, refreshAccessToken, isAccessTokenExpired, adminUser, setAdminUser } = useGlobalContext();


    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

        const fetchCourses = async (token) => {
            try {
                const res = await axios.get('/courses', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                const { user, courses } = res.data
                setAdminUser(user);
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

    if (isLoading) {
        return <Loading />
    }


    // if (!accessToken) {
    //     return navigate('/login') // Render loading spinner
    // }


    return (
        <>
            <div className='media-admin-pannel'>
                <SideBar />
                <Menu />
                {dashboardElement === DashboardTypes.DASHBOARD ? (
                    <Dashboard />
                ) : dashboardElement === DashboardTypes.LEVELS ? (
                    <AdminLevels />
                ) : dashboardElement === DashboardTypes.ADDLESSON ? (
                    <AddLesson />
                ) : dashboardElement === DashboardTypes.USERS ? (
                    <Users />
                ) : dashboardElement === DashboardTypes.DOCUMENTS ? (
                    <Documents />
                ) : dashboardElement === DashboardTypes.VIDEOS ? (
                    <AdminVideos />
                ) : (
                    <Settings />
                )}
            </div>

            {/* MEDIA SCREEN */}
            <div className='media-error'>
                <NotAlailable />
            </div>
        </>
    )
}

export default Admin
