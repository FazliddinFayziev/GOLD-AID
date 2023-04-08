import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Courses, Footer, HerroBanner, Loading, Navbar } from '../Components';
import { useGlobalContext } from '../context/context';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import '../HomeCSS/home.css';
import axios from '../api/axios';

const Home = () => {
    const { bgColor, user, setUser, isLoading, setIsLoading } = useGlobalContext();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    // LOADING
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);



    const useToken = () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

        const isAccessTokenExpired = () => {
            const currentTime = new Date().getTime();
            return currentTime > accessTokenExpireTime;
        };

        // Make API call to refresh access token using refresh token
        const refreshAccessToken = async () => {
            try {
                const refreshToken = localStorage.getItem('refreshToken');

                const response = await axios.post('/newtoken',
                    {
                        refreshToken: refreshToken
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const data = response.data;
                const accessToken = data.accessToken;
                const accessTokenExpireTime = new Date().getTime() + data.expiresIn * 1000;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('accessTokenExpireTime', accessTokenExpireTime);
            } catch (error) {
                console.error(error);
            }

            // Update access token and expiration time in localStorage
            const accessToken = 'newAccessToken';
            const accessTokenExpireTime = new Date().getTime() + 1.5 * 60 * 60 * 1000; // set expiration time to 1.5 hours from now

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('accessTokenExpireTime', accessTokenExpireTime);

        };

        useEffect(() => {
            if (!accessToken || !refreshToken || !accessTokenExpireTime) {
                // Navigate to login page if tokens do not exist in localStorage
                navigate('/')
            } else if (isAccessTokenExpired()) {
                // Navigate to login page if access token is expired
                navigate('/')
            } else {
                refreshAccessToken();
            }
        }, []);

        return accessToken;
    };

    const accessToken = useToken();

    if (isLoading) {
        return <Loading />
    }


    if (!accessToken) {
        return null; // Render loading spinner or other indicator
    }
    return (
        <>
            <div className={bgColor ? 'home-container-white' : 'home-container-black'}>
                <Navbar />
                <HerroBanner />
                <Courses />
                <Footer />
            </div>
        </>
    );
};

export default Home;
