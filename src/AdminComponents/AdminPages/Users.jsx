import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/context';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import "../../css/AdminCSS/users.css";
import UserData from '../UserData';

const Users = () => {
    const { user, refreshAccessToken, isRefreshTokenExpired, setUserInfo } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const [usersLimit, setUsersLimit] = useState({ lim: 10, skip: 0 })
    const { lim, skip } = usersLimit
    const navigate = useNavigate();


    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');
        const refreshTokenExpireTime = localStorage.getItem('refreshTokenExpireTime');

        const fetchAllUsersInfo = async (token) => {
            try {
                const res = await axios.get(`admin/users/?lim=${lim}&skip=${skip}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(res.data);
                const { users } = res.data
                setUserInfo(users)
                setIsLoading(false);
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchAllUsersInfo(refreshedToken); // try the request again with the new token
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
                    await fetchAllUsersInfo(token);
                }
            };
            fetch();
        }, [refetch]);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchAllUsersInfo(token))
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
        <div className='users-info-container'>
            <div className='user-title'>
                Users
            </div>
            <UserData setRefetch={setRefetch} isLoading={isLoading} setIsLoading={setIsLoading} refetch={refetch} setUsersLimit={setUsersLimit} />
        </div>
    )
}

export default Users
