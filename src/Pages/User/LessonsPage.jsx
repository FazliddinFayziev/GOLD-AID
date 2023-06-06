import React, { useEffect, useState } from 'react'
import { Footer, HerroBanner, Lessons, Loading, Navbar } from '../../Components'
import { useGlobalContext } from '../../context/context'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { lessons_default } from '../../assets';


const LessonsPage = () => {
    const { user, bgColor, refreshAccessToken, isRefreshTokenExpired, setLessons, lessonTitle, userProfilePicture, setUserProfilePicture } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    const { level } = useParams();


    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshTokenExpireTime = localStorage.getItem('refreshTokenExpireTime');



        const fetchLessons = async (token) => {
            try {
                const res = await axios.get(`/lessons/${level}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(res.data);
                const { lessons, currentScore, profilePicture } = res.data
                const newArr = lessons.map((lesson) => {
                    const {
                        lessonId,
                        lessonPicture,
                        isCompleted,
                        title,
                    } = lesson
                    return {
                        lessonId: lessonId,
                        title: title,
                        lessonPicture: lessonPicture,
                        isCompleted: isCompleted,
                        currentScore: currentScore,
                        length: lessons.length,
                    }
                })
                const userPicture = {
                    profilePicture: profilePicture
                }
                setLessons(newArr)
                setUserProfilePicture(userPicture)
                setIsLoading(false)
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchLessons(refreshedToken); // try the request again with the new token
                } else if (err.response.status === 403) {
                    navigate('/notallowed')
                } else if (err.response.status === 404) {
                    navigate('/error'); // Navigate to the error page for invalid level
                } else {
                    console.log(err);
                }
            }
        };

        useEffect(() => {
            const fetch = async () => {
                const token = await refreshAccessToken()
                await fetchLessons(token)
                if (!token) return navigate('/login')
                console.log('Access token is fetching the courses')
            }
            fetch()
        }, [])


        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                fetchLessons(user.accessToken)
            }, 3000000); // fetches new urls and tokens every 50 minutes
            return () => clearInterval(timer)
        }, [])

        useEffect(() => {
            if (!refreshToken || !refreshTokenExpireTime) {
                // Navigate to login page if tokens do not exist in localStorage
                navigate('/register')
            } else if (isRefreshTokenExpired()) {
                // Navigate to login page if access token is expired
                navigate('/login')
            } else {
                refreshAccessToken();
                fetchLessons(user.accessToken)
            }
        }, []);

        return accessToken;
    };

    const accessToken = useToken()

    if (isLoading) {
        return <Loading />
    }

    if (!accessToken) {
        return navigate('/login')
    }

    return (
        <>
            <div className={bgColor ? 'home-container-white' : 'home-container-black'}>
                <Navbar />
                <HerroBanner />
                <Lessons />
                <Footer />
            </div>
        </>
    )
}

export default LessonsPage
