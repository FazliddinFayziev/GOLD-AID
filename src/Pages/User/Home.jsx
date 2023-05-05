import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Courses, Footer, HerroBanner, Loading, Navbar } from '../../Components';
import { useGlobalContext } from '../../context/context';
import '../../css/HomeCSS/home.css';
import axios from '../../api/axios';
import { level_default } from '../../assets';

const Home = () => {
    const { bgColor, user, setUser, isAccessTokenExpired, refreshAccessToken, isLoading, setIsLoading, courses, setCourses, userProfile, setUserProfile } = useGlobalContext();
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


        const fetchCourses = async (token) => {
            try {
                const res = await axios.get('/courses', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(res.data);
                const { courses, user } = res.data
                const newArr = courses.map((course) => {
                    const {
                        _id,
                        name,
                        coursePicture,
                        mainScore,
                        isCompleted,
                    } = course
                    return {
                        id: _id,
                        name: name,
                        coursePicture: level_default,
                        mainScore: mainScore,
                        isCompleted: isCompleted
                    }
                })
                setCourses(newArr)
                setUserProfile(user)
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
                const token = await refreshAccessToken()
                await fetchCourses(token)
                if (!token) return navigate('/login')
                console.log('Access token is fetching the courses')
            }
            fetch()
        }, [])


        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                fetchCourses(user.accessToken)
            }, 3000000); // fetches new urls and tokens every 50 minutes
            return () => clearInterval(timer)
        }, [])

        useEffect(() => {
            if (!refreshToken || !accessTokenExpireTime) {
                // Navigate to login page if tokens do not exist in localStorage
                navigate('/register')
            } else if (isAccessTokenExpired()) {
                // Navigate to login page if access token is expired
                navigate('/login')
            } else {
                refreshAccessToken();
                fetchCourses(user.accessToken)
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
