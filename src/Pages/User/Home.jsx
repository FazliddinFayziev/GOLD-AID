import axios from '../../api/axios';
import '../../css/HomeCSS/home.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import { level_default, level_default_ielts } from '../../assets';
import { Courses, Footer, HerroBanner, Loading, Navbar } from '../../Components';

const Home = () => {

    // GLOBAL
    const {
        user,
        bgColor,
        setUser,
        courses,
        isLoading,
        setCourses,
        userProfile,
        setIsLoading,
        setUserProfile,
        userProfilePicture,
        refreshAccessToken,
        isRefreshTokenExpired,
        setUserProfilePicture
    } = useGlobalContext();

    const navigate = useNavigate();

    // LOCAL STORAGE
    const refreshToken = localStorage.getItem('refreshToken');

    // FETCHING THE DATA (GET METHOD)
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
                const { courses, user } = res.data;
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
                const userPicture = {
                    profilePicture: user.profilePicture
                }
                setCourses(newArr);
                setUserProfile(user);
                setUserProfilePicture(userPicture)
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
            if (!refreshToken) {
                navigate('/register');
            } else if (!accessToken) {
                const fetchToken = async () => {
                    const token = await refreshAccessToken();
                    if (!token) {
                        navigate('/register');
                    } else {
                        await fetchCourses(token);
                    }
                };
                fetchToken();
            } else if (isRefreshTokenExpired()) {
                navigate('/login');
            }
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


    // LOADINGS

    if (isLoading) {
        return <Loading />
    }


    if (!accessToken) {
        return <Loading /> // Render loading spinner
    }

    if (!refreshToken) {
        return navigate('/register')
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
