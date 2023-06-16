import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/context';
import { useNavigate, useParams } from 'react-router-dom';
import { Footer, HomeWorkTest, Loading, NotHomework, SmallNavbar } from '../../Components';


const Homework = () => {

    // GLOBAL
    const {
        user,
        bgColor,
        homeworkArray,
        setHomeworkArray,
        refreshAccessToken,
        isRefreshTokenExpired,
        lessonsHomeWorkTimeLeft,
        setLessonsHomeWorkTimeLeft
    } = useGlobalContext();

    const navigate = useNavigate();
    const { lessonId } = useParams();

    // LOCAL
    const [isLoading, setIsLoading] = useState(true);


    // FETCHING DATA (GET METHOD)
    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshTokenExpireTime = localStorage.getItem('refreshTokenExpireTime');

        const fetchHomeWork = async (token) => {
            try {
                const res = await axios.get(`/lessons/homework/${lessonId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(res.data);
                const { homework, timeOut } = res.data
                await setHomeworkArray(homework);
                await setLessonsHomeWorkTimeLeft(timeOut * 60);
                setIsLoading(false)
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchHomeWork(refreshedToken); // try the request again with the new token
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
                    await fetchHomeWork(token);
                }
            };
            fetch();
        }, []);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchHomeWork(token))
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

    if (isLoading || lessonsHomeWorkTimeLeft === 0) {
        return <Loading />
    }


    // if (!accessToken) {
    //     return <Loading /> // Render loading spinner
    // }




    return (
        <>
            <div className={bgColor ? 'homework-test-page-white' : 'homework-test-page-black'}>
                <SmallNavbar />
                {homeworkArray.length > 0 ? (
                    <>
                        {lessonsHomeWorkTimeLeft > 0 && <HomeWorkTest />}
                    </>
                ) : (
                    <NotHomework />
                )
                }
                <Footer />
            </div>
        </>
    )
}

export default Homework
