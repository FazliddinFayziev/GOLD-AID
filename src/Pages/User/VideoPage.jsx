import React, { useEffect, useState } from 'react'
import { BeforeHomework, CommentSection, Files, Footer, GoLessons, LessonTitle, Loading, SmallNavbar, Video, VideoLanguage } from '../../Components'
import { useGlobalContext } from '../../context/context'
import "../../css/VideosCSS/videoPage.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios';

const VideoPage = () => {
    const { bgColor, user, refreshAccessToken, isAccessTokenExpired, setSingleLesson, comments, setComments, changeComment, setChangeComment } = useGlobalContext();
    const { level, lessonId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();



    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');



        const fetchSingleLesson = async (token) => {
            try {
                const res = await axios.get(`/lessons/single?course=${level}&lessonId=${lessonId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(res.data);
                const { lesson: { course, files, videos, lessonPicture, title, description, } } = res.data
                const newArr = {
                    lessonId: lessonId,
                    title: title,
                    videos: videos,
                    files: files,
                    lessonPicture: lessonPicture,
                    description: description,
                    course: course,
                }
                setSingleLesson(newArr)
                setIsLoading(false)
            } catch (err) {
                if (err && err.response && err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchSingleLesson(refreshedToken); // try the request again with the new token
                } else {
                    console.log(err);
                }
            }
        };

        const fetchComments = async (token) => {
            try {
                const res = await axios.get(`/lessons/comments/all/?lessonId=${lessonId}&lim=20&skip=0`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(res.data);
                const { comments } = res.data
                setComments(comments)
                setIsLoading(false)
            } catch (err) {
                if (err && err.response && err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchComments(refreshedToken); // try the request again with the new token
                } else {
                    console.log(err);
                }
            }
        };


        useEffect(() => {
            const fetch = async () => {
                const token = await refreshAccessToken()
                await fetchSingleLesson(token)
                if (!token) return navigate('/login')
                console.log('Access token is fetching the courses')
            }
            fetch()
        }, [])


        useEffect(() => {
            const fetch = async () => {
                const token = await refreshAccessToken();
                if (!token) return navigate('/login');
                console.log('Access token is fetching the courses');
                await fetchComments(token);
            };
            fetch()
        }, [changeComment])


        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                fetchSingleLesson(user.accessToken)
                fetchComments(user.accessToken)
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
                fetchSingleLesson(user.accessToken)
                fetchComments(user.accessToken)
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
            <div className={bgColor ? 'video-container-white' : 'video-container-black'}>
                <SmallNavbar />
                <GoLessons />
                <LessonTitle />
                <VideoLanguage />
                <Video />
                <Files />
                <BeforeHomework />
                <CommentSection />
                <Footer />
            </div>
        </>
    )
}

export default VideoPage
