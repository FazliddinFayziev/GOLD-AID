import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import '../../css/AdminCSS/singleAdminLesson.css';
import { ImUpload } from "react-icons/im";
import { level_default } from "../../assets";
import { VscFileSubmodule } from "react-icons/vsc";
import { BsDownload } from "react-icons/bs";
import axios from '../../api/axios';
import EditVideos from '../EditVideos';
import EditFiles from '../EditFiles';
import { IoIosArrowBack } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import { GiArchiveResearch } from "react-icons/gi";

const SingleAdminLessonPage = () => {

    const { courseName, lessonId } = useParams();
    const { refreshAccessToken, isAccessTokenExpired, user, singleAdminLesson, setSingleAdminLesson } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const { accessToken } = user
    const navigate = useNavigate();

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


    const getAccess = useToken();


    const deleteLesson = async (token) => {
        try {
            const res = await axios.delete(`/admin/lessons/${lessonId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                deleteLesson(refreshedToken); // try the request again with the new token
            } else {
                console.log(err);
            }
        }
    };


    // DELETE LESSON
    const handleDeleteLesson = () => {
        deleteLesson(accessToken)
        navigate(`/admin/courses/${courseName}`)
    }


    return (
        <div className='edit-lesson-container'>
            <div className='edit-lesson-title'>
                Single Lesson
            </div>
            {isLoading ? (
                <div className='loading-users'>
                    <div className="loading-circle-user"></div>
                </div>
            ) : (
                <>

                    <Link to={`/admin/courses/${courseName}`}>
                        <div className='admin-lesson-card-back'>
                            <IoIosArrowBack className='back-to-courses' />
                        </div>
                    </Link>

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

                        {
                            singleAdminLesson.files.length !== 0 ? (
                                <div className='files-edit-container-box'>
                                    {singleAdminLesson.files.map((file, index) => {
                                        return <EditFiles {...file} key={index} />
                                    })}
                                </div>
                            ) : (
                                <>
                                    <div className='no-homework-icon'>
                                        <div>
                                            <div className='icon-center'>
                                                <GiArchiveResearch fontSize={30} />
                                            </div>
                                            <p>There is no Files</p>
                                        </div>
                                    </div>
                                </>
                            )
                        }

                    </div>


                    <div>

                        <div className='video-edit-title'>
                            <h1 className='black'>Homework</h1>
                        </div>


                        {singleAdminLesson.homework.length !== 0 ? (
                            singleAdminLesson.homework.map((homework, index) => {
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
                            })) : (
                            <>
                                <div className='no-homework-icon'>
                                    <div>
                                        <div className='icon-center'>
                                            <BiSearchAlt fontSize={30} />
                                        </div>
                                        <p>There is no Homework</p>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>

                    {/* DELETE LESSON */}

                    <div onClick={handleDeleteLesson} className='delete-lesson'>
                        <button>Delete Lesson</button>
                    </div>
                </>

            )}



        </div >
    )
}

export default SingleAdminLessonPage