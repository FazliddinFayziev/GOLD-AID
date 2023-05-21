import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import '../../css/AdminCSS/singleAdminLesson.css';
import { ImUpload } from "react-icons/im";
import { level_default } from "../../assets";
import { VscFileSubmodule } from "react-icons/vsc";
import { BsDownload } from "react-icons/bs";
import axios from '../../api/axios';
import EditVideos from '../EditVideos';

const SingleAdminLessonPage = () => {

    const { courseName, lessonId } = useParams();
    const { refreshAccessToken, isAccessTokenExpired, user } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);



    const useToken = () => {

        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');
        const navigate = useNavigate();

        const fetchLessons = async (token) => {
            try {
                const res = await axios.get(`/admin/lessons/single?course=${courseName}&lessonId=${lessonId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                setIsLoading(false);
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchLessons(refreshedToken); // try the request again with the new token
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
                    await fetchLessons(token);
                }
            };
            fetch();
        }, []);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchLessons(token))
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
        <div className='edit-lesson-container'>
            <div className='edit-lesson-title'>
                Add Lesson
            </div>
            <div className='edit-container'>

                {/* BOX - 1 */}

                <div className='edit-box-1'>
                    <div className='edit-image-title'>Image:</div>
                    <div className="edit-input">
                        <div id="edit-image-admin"></div>
                        <label htmlFor="edit-input">
                            <div className="edit-icon">
                                {
                                    <img src={level_default} alt="edit-image" />
                                }
                            </div>
                            <span className="edit-name">Edit Image</span>
                        </label>
                    </div>
                </div>

                {/* BOX - 2 */}

                <div className='edit-box-2'>
                    <div>
                        <div className='edit-add-lesson-title'>
                            <h4>Title: </h4>
                            <br />
                            <h4 className='h4-title'>Present Perfect Simple</h4>
                        </div>
                        <div className='edit-add-lesson-title'>
                            <h4>Description:</h4>
                            <br />
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, eveniet.</p>
                        </div>
                        <div className='edit-add-lesson-title'>
                            <h4>Course:</h4>
                            <h3>BEGINNER</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* VIDEOS */}
            <div>
                <div className='video-edit-title'>
                    <h1 className='black'>Video</h1>
                </div>

                <EditVideos />

            </div>

            <div className='video-edit-title'>
                <h1 className='black'>Video</h1>
            </div>

            <div className='fuck'>

                <div className='files-edit-container-box'>

                    <div className='files-edit-container'>
                        <div className='files-edit-box'>
                            <div className='file-edit-icon'>
                                <VscFileSubmodule fontSize={30} />
                            </div>
                            <div className='file-edit-title'>
                                <p>Document</p>
                            </div>
                            <div className='file-edit-dowload'>
                                <BsDownload fontSize={30} />
                            </div>
                        </div>
                    </div>

                    <div className='files-edit-container'>
                        <div className='files-edit-box'>
                            <div className='file-edit-icon'>
                                <VscFileSubmodule fontSize={30} />
                            </div>
                            <div className='file-edit-title'>
                                <p>Document</p>
                            </div>
                            <div className='file-edit-dowload'>
                                <BsDownload fontSize={30} />
                            </div>
                        </div>
                    </div>

                    <div className='files-edit-container'>
                        <div className='files-edit-box'>
                            <div className='file-edit-icon'>
                                <VscFileSubmodule fontSize={30} />
                            </div>
                            <div className='file-edit-title'>
                                <p>Document</p>
                            </div>
                            <div className='file-edit-dowload'>
                                <BsDownload fontSize={30} />
                            </div>
                        </div>
                    </div>

                    <div className='files-edit-container'>
                        <div className='files-edit-box'>
                            <div className='file-edit-icon'>
                                <VscFileSubmodule fontSize={30} />
                            </div>
                            <div className='file-edit-title'>
                                <p>Document</p>
                            </div>
                            <div className='file-edit-dowload'>
                                <BsDownload fontSize={30} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default SingleAdminLessonPage