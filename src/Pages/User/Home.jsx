import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Courses, Footer, HerroBanner, Loading, Navbar } from '../../Components';
import { useGlobalContext } from '../../context/context';
import '../../HomeCSS/home.css';
import axios from '../../api/axios';

const Home = () => {
    const { bgColor, user, setUser, isLoading, setIsLoading, } = useGlobalContext();
    const navigate = useNavigate();

    // LOADING
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);



    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

        const isAccessTokenExpired = () => {
            const currentTime = new Date().getTime();
            return currentTime > accessTokenExpireTime;
        };

        // Make API call to refresh access token using refresh token
        const refreshAccessToken = async () => {
            try {
                const token = localStorage.getItem('refreshToken');

                const response = await axios.get('/newtoken',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                const { accessToken } = response.data;
                const accessTokenExpireTime = new Date().getTime() + 30 * 1000;

                setUser({ ...user, accessToken: accessToken });
                localStorage.setItem('accessTokenExpireTime', accessTokenExpireTime);
                console.log(accessToken);
            } catch (error) {
                console.error(error);
                logOut()
            }

            // Update access token and expiration time
            const accessToken = 'newAccessToken';
            const accessTokenExpireTime = new Date().getTime() + 30 * 1000; // set expiration time to 30 seconds from now

            setUser({ ...user, accessToken: accessToken });
            localStorage.setItem('accessTokenExpireTime', accessTokenExpireTime);

        };

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
            }, 30000); // fetches new urls and tokens every 30 seconds
            return () => clearInterval(timer)
        }, [])

        const logOut = () => {
            setUser({})
            localStorage.setItem('refreshToken', '')
            return navigate('/login')
        }

        useEffect(() => {
            if (!refreshToken || !accessTokenExpireTime) {
                // Navigate to login page if tokens do not exist in localStorage
                navigate('/register')
            } else if (isAccessTokenExpired()) {
                // Navigate to login page if access token is expired
                navigate('/login')
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
        return <Loading /> // Render loading spinner or other indicator
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
