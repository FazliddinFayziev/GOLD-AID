import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import '../../css/AdminCSS/singleAdminLesson.css';
import { ImUpload } from "react-icons/im";
import { level_default } from "../../assets";
import { VscFileSubmodule } from "react-icons/vsc";
import { BsDownload } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from '../../api/axios';
import EditVideos from '../EditVideos';
import EditFiles from '../EditFiles';
import { IoIosArrowBack } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import { GiArchiveResearch } from "react-icons/gi";

const SingleAdminLessonPage = () => {

    const { courseName, lessonId } = useParams();
    const { refreshAccessToken, isAccessTokenExpired, user, singleAdminLesson, setSingleAdminLesson, changeAdminCourse, setChangeAdminCourse } = useGlobalContext();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [editLessonImage, setEditLessonImage] = useState(false);
    const [editAdminTitle, setEditAdminTitle] = useState(false);
    const [editAdminDescription, setEditAdminDescription] = useState(false);
    const [description, setDescription] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [title, setTitle] = useState('');
    const [addFileInfo, setAddFileInfo] = useState(false);
    const [addedFile, setAddedFile] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);
    const [question, setQuestion] = useState('');
    const [option, setOption] = useState({ option_1: '', option_2: '', option_3: '', option_4: '' });
    const { option_1, option_2, option_3, option_4 } = option
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [editHomeworkTime, setEditHomeworkTime] = useState(false);
    const [homeTime, setHomeTime] = useState('');
    const [editCardHomework, setEditCardHomework] = useState(false);
    const [getIdOfHome, setGetIdOfHome] = useState('');

    const { accessToken } = user
    const navigate = useNavigate();


    // Set ShowCard false after 5 second
    useEffect(() => {
        setTimeout(() => setErrorMsg(''), 10000);
    }, [errorMsg]);

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
            const fetch = async () => {
                const token = await refreshAccessToken();
                if (!token) {
                    navigate('/register');
                } else {
                    await fetchLessons(token);
                }
            };
            fetch();
        }, [refetch]);

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

    // DELETE LOGIC
    const handleDeleteLesson = () => {
        setShowDeleteConfirmation(true); // Show delete confirmation card
    };

    const handleConfirmDelete = async () => {
        deleteLesson(accessToken);
        setChangeAdminCourse(!changeAdminCourse)
        navigate(`/admin/courses/${courseName}`);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false); // Hide delete confirmation card
    };


    // EDIT IMAGE

    // UPLOAD IMAGE
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    useEffect(() => {
        if (selectedFile) {
            // Create a preview URL for the selected image
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
            setUploaded(true);
            console.log(selectedFile.name);
            console.log(selectedFile);
        }
    }, [selectedFile]);

    const EditImage = async (token) => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            const res = await axios.patch(`/admin/lessons/lesson/edit/picture/${lessonId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setIsLoading(false)
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                EditImage(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err)
                setIsLoading(false)
            }
        }
    };

    const handleChangeImage = () => {
        EditImage(accessToken)
        setEditLessonImage(false)
        setRefetch(!refetch)
    }








    // CHANGE TITLE
    const EditTitle = async (token) => {
        setIsLoading(true)
        try {
            const res = await axios.patch(`/admin/lessons/lesson/edit/title/${lessonId}`, {
                title
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setIsLoading(false)
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                EditTitle(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err)
                setIsLoading(false)
            }
        }
    };


    const handleChangeTitle = () => {
        EditTitle(accessToken);
        setEditAdminTitle(false);
        setRefetch(!refetch)
    }





    // EDIT DESCRIPTION

    const EditDescription = async (token) => {
        setIsLoading(true)
        try {
            const res = await axios.patch(`/admin/lessons/lesson/edit/description/${lessonId}`, {
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setIsLoading(false)
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                EditDescription(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err)
                setIsLoading(false)
            }
        }
    };


    const handleChangeDescription = () => {
        EditDescription(accessToken);
        setEditAdminDescription(false);
        setRefetch(!refetch)
    }











    // UPDATE VIDEO




    // ADD NEW FILE
    const handleAddFile = (event) => {
        const file = event.target.files[0];
        setAddedFile(file);
    };

    useEffect(() => {
        if (addedFile) {
            // Create a preview URL for the selected file
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewFile(reader.result);
            };
            reader.readAsDataURL(addedFile);
        }
    }, [addedFile]);


    // ADD FILE API
    const AddFile = async (token) => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('files', addedFile);
            formData.append('lessonId', lessonId);
            const res = await axios.post(`/admin/lessons/files`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setIsLoading(false)
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                AddFile(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err)
                setIsLoading(false)
            }
        }
    };


    const handleAddNewFile = () => {
        AddFile(accessToken);
        setAddFileInfo(false);
        setRefetch(!refetch)
    }


    // DELETE SINGLE FILE
    const DeleteSingleFile = async (token, Key) => {
        setIsLoading(true)
        try {
            const res = await axios.delete(`admin/lessons/files/file/?lessonId=${lessonId}&fileId=${Key}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully Deleted!');
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                DeleteSingleFile(refreshedToken, Key); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err);
                setIsLoading(false);
            }
        }
    };


    const handleDeleteSingleFile = (Key) => {
        DeleteSingleFile(accessToken, Key);
        setRefetch(!refetch)
    }



    // DELETE ALL FILES AT THE SAME TIME

    const DeleteAllFiles = async (token) => {
        setIsLoading(true)
        try {
            const res = await axios.delete(`/admin/lessons/files/${lessonId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully Deleted!');
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                DeleteAllFiles(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err);
                setIsLoading(false);
            }
        }
    };


    const handleDeleteAllFiles = () => {
        DeleteAllFiles(accessToken);
        setRefetch(!refetch)
    }










    // DELETE SINGLE QUESTION

    const deleteSingleHomework = async (token, id) => {
        setIsLoading(true);
        try {
            const res = await axios.delete(`/admin/homework/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully Deleted!');
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // Refresh the token
                deleteSingleHomework(refreshedToken, id); // Try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err);
                setIsLoading(false);
            }
        }
    };



    const handleDeleteSingleQuestion = (id) => {
        deleteSingleHomework(accessToken, id);
        setRefetch(!refetch)
    }





    // ADD HOMEWORK

    const AddHomework = async (token) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`/admin/homework`, {
                question: question,
                options: [option_1, option_2, option_3, option_4],
                correctAnswer: correctAnswer,
                lessonId: lessonId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setQuestion('')
            setOption({ option_1: '', option_2: '', option_3: '', option_4: '' })
            setCorrectAnswer('')
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // Refresh the token
                AddHomework(refreshedToken); // Try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err);
                setIsLoading(false);
            }
        }
    };


    const handleAddHomework = () => {
        AddHomework(accessToken);
        setRefetch(!refetch)
    }


    // EDIT HOMEWORK TIME

    const EditHomeworkTime = async (token) => {
        setIsLoading(true);
        try {
            const res = await axios.patch(`/admin/homework/timeout/${lessonId}`, {
                timeOutMinutes: homeTime
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // Refresh the token
                EditHomeworkTime(refreshedToken); // Try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err);
                setIsLoading(false);
            }
        }
    };


    const handleEditHomeworkTime = () => {
        EditHomeworkTime(accessToken);
        setEditHomeworkTime(false)
        setRefetch(!refetch)
    }


    // EDIT SINGLE HOMEWORK QUESTION, OPTIONS AND SO ON

    const EditHomeworkQuestion = async (token) => {
        setIsLoading(true);
        try {
            const res = await axios.patch(`/admin/homework/${getIdOfHome}`, {
                question: question,
                options: [option_1, option_2, option_3, option_4],
                correctAnswer: correctAnswer,
                lessonId: lessonId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setQuestion('');
            setOption({ option_1: '', option_2: '', option_3: '', option_4: '' });
            setCorrectAnswer('');
            setEditCardHomework(false);
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // Refresh the token
                EditHomeworkQuestion(refreshedToken); // Try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err);
                setIsLoading(false);
            }
        }
    };


    const handleEditHomeworkQuestion = () => {
        EditHomeworkQuestion(accessToken);
        setRefetch(!refetch)
    }







    // DELETE ALL HOMEWORKS

    const DeleteAllHomeworkQuestions = async (token) => {
        setIsLoading(true);
        try {
            const res = await axios.delete(`/admin/homework/all/${lessonId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully Deleted ! ! !');
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // Refresh the token
                DeleteAllHomeworkQuestions(refreshedToken); // Try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err);
                setIsLoading(false);
            }
        }
    };

    const handleDeleteAllHomeworks = () => {
        DeleteAllHomeworkQuestions(accessToken);
        setRefetch(!refetch)
    }


















    return (
        <div className='edit-lesson-container'>
            <div className='edit-lesson-title'>
                Single Lesson
            </div>
            <div className={errorMsg === 'Successfully uploaded ! ! !' ? 'add-lesson-add-error-green' : 'add-lesson-add-error'}>
                {errorMsg}
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

                        {/* EDIT - 1 ==========================================================> */}
                        {
                            editLessonImage ? (
                                <div className='upload-box-1'>
                                    <div className='upload-image-title'>Image:</div>
                                    <div className="upload-input">
                                        <input
                                            type="file"
                                            id="file-input"
                                            onChange={handleFileChange}
                                        />
                                        <label htmlFor="file-input">
                                            <div className="upload-icon">
                                                {
                                                    !uploaded ? <ImUpload /> : (
                                                        <img src={previewImage} alt="selected-file" />
                                                    )
                                                }
                                            </div>
                                            <span className="file-name">{selectedFile ? selectedFile.name : 'Choose a file'}</span>
                                            <br />
                                            <button onClick={handleChangeImage} className="edit-name">Save</button>
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className='edit-box-1'>
                                    <div className='edit-image-title'>Image:</div>
                                    <div className="edit-input">
                                        <div id="edit-image-admin"></div>
                                        <label htmlFor="edit-input">
                                            <div className="edit-icon">
                                                {
                                                    <img
                                                        src={singleAdminLesson.thumbNail ? singleAdminLesson.thumbNail.Url : level_default}
                                                        alt='admin-profile-image'
                                                        onError={(e) => {
                                                            e.target.onerror = null; // Prevent infinite loop if the default image also fails to load
                                                            e.target.src = level_default; // Display the default profile image
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <button onClick={() => setEditLessonImage(true)} className="edit-name">Edit Image</button>
                                        </label>
                                    </div>
                                </div>
                            )
                        }

                        {/* BOX - 2 ==================================> */}

                        <div className='edit-box-2'>
                            <div>
                                {editAdminTitle ? (
                                    <>
                                        <div className='upload-add-lesson-title'>
                                            <h4>Title: </h4>
                                            <br />
                                            <input value={title} type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                        <button onClick={handleChangeTitle} className='edit-title-admin'>Save</button>
                                    </>
                                ) : (
                                    <>
                                        <div className='edit-add-lesson-title'>
                                            <h4>Title: </h4>
                                            <br />
                                            <h4 className='h4-title'>{singleAdminLesson.title}</h4>
                                        </div>
                                        <button onClick={() => setEditAdminTitle(true)} className='edit-title-admin'>Edit Title</button>
                                    </>
                                )}
                                {
                                    editAdminDescription ? (
                                        <>
                                            <div className='upload-add-lesson-title'>
                                                <h4>Description:</h4>
                                                <br />
                                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="comment" form="usrform" placeholder='Text...'></textarea>
                                            </div>
                                            <button onClick={handleChangeDescription} className='edit-title-admin'>Save</button>
                                        </>
                                    ) : (
                                        <>
                                            <div className='edit-add-lesson-title'>
                                                <h4>Description:</h4>
                                                <br />
                                                <p>{singleAdminLesson.description}</p>
                                            </div>
                                            <button onClick={() => setEditAdminDescription(true)} className='edit-title-admin'>Edit Description</button>
                                        </>
                                    )
                                }
                                <div className='edit-add-lesson-title'>
                                    <h4>Course:</h4>
                                    <h3>{courseName.toLocaleUpperCase()}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* VIDEOS ======================================================================================================> */}

                    <div>

                        <div className='video-edit-title'>
                            <h1 className='black'>Video</h1>
                        </div>

                        <EditVideos />

                    </div>


                    {/* FILES ===================================================================================================> */}

                    <div>

                        <div className='video-edit-title'>
                            <h1 className='black'>Files</h1>
                        </div>

                        <div className={errorMsg === 'Successfully uploaded ! ! !' ? 'add-lesson-add-error-green' : 'add-lesson-add-error'}>
                            {errorMsg}
                        </div>

                        {
                            addFileInfo ? (
                                <>
                                    <div className="upload-container-admin-file">
                                        <input type="file" id="file-input-admin-file" className="file-input-admin-file" accept=".pdf, .jpg, .jpeg, .png" onChange={handleAddFile} />
                                        <label htmlFor="file-input-admin-file" className="file-label-admin-file">
                                            <span className="file-icon-admin-file">
                                                <i className="fas fa-cloud-upload-alt-admin-file"></i>
                                            </span>
                                            <span className="file-text-admin-file">{addedFile ? addedFile.name : 'Choose a file'}</span>
                                        </label>
                                    </div>
                                    <div className='add-new-file'>
                                        <button onClick={handleAddNewFile}>UPLOAD</button>
                                    </div>
                                </>
                            ) : (
                                <div onClick={() => setAddFileInfo(true)} className='add-new-file'>
                                    <button>Add File <AiFillPlusCircle fontSize={20} className='add-file-icon' /></button>
                                </div>
                            )
                        }

                        {
                            singleAdminLesson.files.length !== 0 ? (
                                <>
                                    <div className='files-edit-container-box'>
                                        {singleAdminLesson.files.map((file, index) => {
                                            return <EditFiles {...file} key={index} index={index} handleDeleteSingleFile={handleDeleteSingleFile} />
                                        })}
                                    </div>
                                    <div className='delete-all-files'>
                                        <button onClick={handleDeleteAllFiles}>
                                            Delete All Files
                                        </button>
                                    </div>
                                </>
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



                    {/* HOMEWORK ==========================================================================================> */}


                    <div>

                        <div className='video-edit-title'>
                            <h1 className='black'>Homework</h1>
                        </div>
                        <div className={errorMsg === 'Successfully uploaded ! ! !' ? 'add-lesson-add-error-green' : 'add-lesson-add-error'}>
                            {errorMsg}
                        </div>


                        <div className='homework-timeout'>
                            <div className='homework-timeout-container'>
                                <p>Homework Time</p>
                                {editHomeworkTime ? (
                                    <input value={homeTime} onChange={(e) => setHomeTime(e.target.value)} className='change-home-time' type="number" />
                                ) : (
                                    <h3><span>{singleAdminLesson.homeWorkTimeOut}</span> Minutes</h3>
                                )}
                            </div>
                        </div>

                        {editHomeworkTime ? (
                            <div onClick={handleEditHomeworkTime} className='add-new-file'>
                                <button>Save</button>
                            </div>
                        ) : (
                            <div onClick={() => setEditHomeworkTime(true)} className='add-new-file'>
                                <button>Edit Homework Time</button>
                            </div>
                        )}



                        <div className='upload-homework'>
                            <h4 className='upload-homework-title-main'>Upload HomeWork</h4>
                            <div className='upload-homework-container-box'>
                                <div className='upload-homework-box'>

                                    <div className='homework-question'>
                                        <div className='upload-homework-container'>
                                            <h3>Question:</h3>
                                            <input value={question} onChange={(e) => setQuestion(e.target.value)} type="text" placeholder='Question...' />
                                        </div>
                                    </div>

                                    <h4>All Options</h4>
                                    <div className='homework-all-options'>
                                        <div className='option'>
                                            <p>Option-1</p>
                                            <input value={option_1} onChange={(e) => setOption({ ...option, option_1: e.target.value })} type="text" />
                                        </div>
                                        <div className='option'>
                                            <p>Option-2</p>
                                            <input value={option_2} onChange={(e) => setOption({ ...option, option_2: e.target.value })} type="text" />
                                        </div>
                                        <div className='option'>
                                            <p>Option-3</p>
                                            <input value={option_3} onChange={(e) => setOption({ ...option, option_3: e.target.value })} type="text" />
                                        </div>
                                        <div className='option'>
                                            <p>Option-4</p>
                                            <input value={option_4} onChange={(e) => setOption({ ...option, option_4: e.target.value })} type="text" />
                                        </div>
                                    </div>

                                    <div className='homework-options'>
                                        <div className='upload-add-homework-title'>
                                            <h4>Choose Correct Answer</h4>
                                            <br />
                                            <select onChange={(e) => setCorrectAnswer(e.target.value)} name='options'>
                                                <option value="choose">Choose</option>
                                                <option value={option_1}>Option-1</option>
                                                <option value={option_2}>Option-2</option>
                                                <option value={option_3}>Option-3</option>
                                                <option value={option_4}>Option-4</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div onClick={handleAddHomework} className='add-new-file'>
                                        <button>Add Homework</button>
                                    </div>

                                </div>
                            </div>
                        </div>


                        {/* EDIT CARD ======================================> */}
                        {
                            editCardHomework && (
                                <div className='edit-confirmation-overlay'>
                                    <div className='edit-confirmation-card'>
                                        <div className='error-msg-homework'>
                                            <p>{errorMsg}</p>
                                        </div>
                                        <div className='edit-homework'>
                                            <h4 className='edit-homework-title-main'>Edit HomeWork</h4>
                                            <div className='edit-homework-container-box'>
                                                <div className='edit-homework-box'>

                                                    <div className='edit-homework-question'>
                                                        <div className='edit-homework-container'>
                                                            <h3>Question:</h3>
                                                            <input value={question} onChange={(e) => setQuestion(e.target.value)} type="text" placeholder='Question...' />
                                                        </div>
                                                    </div>

                                                    <h4>All Options</h4>
                                                    <div className='edit-homework-all-options'>
                                                        <div className='edit-option'>
                                                            <p>Option-1</p>
                                                            <input value={option_1} onChange={(e) => setOption({ ...option, option_1: e.target.value })} type="text" />
                                                        </div>
                                                        <div className='edit-option'>
                                                            <p>Option-2</p>
                                                            <input value={option_2} onChange={(e) => setOption({ ...option, option_2: e.target.value })} type="text" />
                                                        </div>
                                                        <div className='edit-option'>
                                                            <p>Option-3</p>
                                                            <input value={option_3} onChange={(e) => setOption({ ...option, option_3: e.target.value })} type="text" />
                                                        </div>
                                                        <div className='edit-option'>
                                                            <p>Option-4</p>
                                                            <input value={option_4} onChange={(e) => setOption({ ...option, option_4: e.target.value })} type="text" />
                                                        </div>
                                                    </div>

                                                    <div className='edit-homework-options'>
                                                        <div className='edit-add-homework-title'>
                                                            <h4>Choose Correct Answer</h4>
                                                            <br />
                                                            <select onChange={(e) => setCorrectAnswer(e.target.value)} name='options'>
                                                                <option value="choose">Choose</option>
                                                                <option value={option_1}>Option-1</option>
                                                                <option value={option_2}>Option-2</option>
                                                                <option value={option_3}>Option-3</option>
                                                                <option value={option_4}>Option-4</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className='edit-homework-button'>
                                                        <button onClick={handleEditHomeworkQuestion}>Edit Homework</button>
                                                    </div>
                                                    <div className='cancel-homework-button'>
                                                        <button onClick={() => setEditCardHomework(false)}>Go back</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }


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
                                        <button onClick={() => {
                                            setGetIdOfHome(homework._id);
                                            setQuestion('');
                                            setOption({ option_1: '', option_2: '', option_3: '', option_4: '' });
                                            setCorrectAnswer('');
                                            setEditCardHomework(true);
                                        }} className='admin-edit-button'>Edit</button>
                                        <button onClick={() => handleDeleteSingleQuestion(homework._id)} className='admin-edit-button-delete'>Delete</button>
                                    </div>
                                )
                            })
                        ) : (
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
                        <br />
                        {singleAdminLesson.homework.length !== 0 && (
                            <button onClick={handleDeleteAllHomeworks} className='admin-edit-button-delete'>Delete All</button>
                        )}


                    </div>

                    {/* DELETE LESSON */}

                    {/* DELETE LESSON */}
                    <div className='delete-lesson'>
                        <button onClick={handleDeleteLesson}>Delete Lesson</button>
                    </div>

                    {/* Delete Confirmation Card */}
                    {showDeleteConfirmation && (
                        <div className='delete-confirmation-overlay'>
                            <div className='delete-confirmation-card'>
                                <h3>Are you sure you want to delete this lesson?</h3>
                                <div className='confirmation-buttons'>
                                    <button className='confirm-delete-button' onClick={handleConfirmDelete}>Yes</button>
                                    <button className='cancel-delete-button' onClick={handleCancelDelete}>No</button>
                                </div>
                            </div>
                        </div>
                    )}
                </>

            )}



        </div >
    )
}

export default SingleAdminLessonPage