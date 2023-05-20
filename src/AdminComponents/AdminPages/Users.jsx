import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/context';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import "../../css/AdminCSS/users.css";
import UserData from '../UserData';

const Users = () => {
    const { user, refreshAccessToken, isAccessTokenExpired, userInfo, setUserInfo } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

        const fetchDashboardInfo = async (token) => {
            try {
                const res = await axios.get('admin/users/?lim=5&skip=0', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                const { users } = res.data
                setUserInfo(users)
                setIsLoading(false);
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchDashboardInfo(refreshedToken); // try the request again with the new token
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



    return (
        <div className='users-info-container'>
            <div className='user-title'>
                Users
            </div>
            <UserData isLoading={isLoading} />
        </div>
    )
}

export default Users
