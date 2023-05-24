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
import EditFiles from '../EditFiles';

const SingleAdminLessonPage = () => {

    const { courseName, lessonId } = useParams();
    const { refreshAccessToken, isAccessTokenExpired, user, singleAdminLesson, setSingleAdminLesson } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);

    // const files = singleAdminLesson?.files || [];

    // const filesObjArr = files.map((file, index) => ({
    //     id: index + 1,
    //     file: file.Url,
    // }));



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
                const { lesson } = res.data
                setSingleAdminLesson(lesson)
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


    // TURNING THE ARRAY INTO OBJECT IN HOME OPTIONS ARRAY
    const OptionsArrayToObject = (array) => {
        const OptionsObjArr = array.map((option) => ({
            value: option,
        }));
        return OptionsObjArr
    }


    const accessToken = useToken();


    return (
        <div className='edit-lesson-container'>
            <div className='edit-lesson-title'>
                Add Lesson
            </div>
            {isLoading ? (
                <div className='loading-users'>
                    <div className="loading-circle-user"></div>
                </div>
            ) : (
                <>

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
                                    <h4 className='h4-title'>{singleAdminLesson.title}</h4>
                                </div>
                                <div className='edit-add-lesson-title'>
                                    <h4>Description:</h4>
                                    <br />
                                    <p>{singleAdminLesson.description}</p>
                                </div>
                                <div className='edit-add-lesson-title'>
                                    <h4>Course:</h4>
                                    <h3>{courseName.toLocaleUpperCase()}</h3>
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


                    {/* FILES */}

                    <div>

                        <div className='video-edit-title'>
                            <h1 className='black'>Files</h1>
                        </div>

                        {/* {
                    // files.length ? (
                        filesObjArr.map((document, index) => {
                            return (
                                
                            )
                } */}

                        {/* {
                    singleAdminLesson.files.map((document, index) => {
                    })
                } */}
                        {/* {singleAdminLesson.files.map((document) => {
                    <EditFiles {...document} />
                })} */}


                    </div>


                    <div>

                        <div className='video-edit-title'>
                            <h1 className='black'>Homework</h1>
                        </div>


                        {singleAdminLesson.homework && singleAdminLesson.homework.map((homework, index) => {
                            return (
                                <div key={index}>
                                    <div className="homework-edit-div">
                                        <h3 className='homework-edit-question'>{index + 1}) {homework.question}</h3>
                                        {OptionsArrayToObject(homework.options).map((option, index) => {
                                            return (
                                                <label key={index} className="homework-edit-label">
                                                    <input
                                                        className='homework-edit-input'
                                                        type="radio"
                                                        name={homework._id}
                                                        value={option.value}
                                                    />
                                                    <span>{option.value}</span>
                                                </label>
                                            )
                                        })}
                                        <p className='homework-correct-answer-title'>Correct Answer:</p>
                                        <p className='homework-correct-answer'>{homework.correctAnswer}</p>
                                    </div>
                                    <button className='admin-edit-button'>Edit</button>
                                </div>
                            )
                        })}

                    </div>
                </>
            )}

        </div >
    )
}

export default SingleAdminLessonPage