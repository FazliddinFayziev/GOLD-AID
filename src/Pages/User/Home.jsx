import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Courses, Footer, HerroBanner, Loading, Navbar } from '../../Components';
import { useGlobalContext } from '../../context/context';
import '../../css/HomeCSS/home.css';
import axios from '../../api/axios';
import { level_default, level_default_ielts } from '../../assets';

const Home = () => {
    const { bgColor, user, setUser, isAccessTokenExpired, refreshAccessToken, isLoading, setIsLoading, courses, setCourses, userProfile, setUserProfile, userProfilePicture, setUserProfilePicture } = useGlobalContext();
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


    if (!accessToken) {
        return navigate('/login') // Render loading spinner
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
