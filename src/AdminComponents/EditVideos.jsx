import React, { useState } from 'react';
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { useGlobalContext } from '../context/context';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';

const EditVideos = ({ addVideoCard, setAddVideoCard, refetch, setRefetch, deleteCard, setDeleteCard }) => {
    const { refreshAccessToken, user } = useGlobalContext();
    const { lessonId } = useParams();
    const { accessToken } = user;
    // EDIT IMAGES
    const [isChecked, setIsChecked] = useState(false); // Checkbox 
    const { singleAdminLesson, setSingleAdminLesson } = useGlobalContext();
    const [language, setLanguage] = useState('');


    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteMsg, setDeleteMsg] = useState('');


    const [selectedFile, setSelectedFile] = useState(null);
    const [previewVideo, setPreviewVideo] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Create a preview URL for the selected image
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewVideo(reader.result);
        };
        reader.readAsDataURL(file);
        setUploaded(true)
    };


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle checkbox state
    };


    const findUrlByLanguage = (language) => {
        if (singleAdminLesson && singleAdminLesson.videos) {
            const video = singleAdminLesson.videos.find((video) => video.lng === language);
            return video ? video.Url : null;
        }
        return null;
    };


    // ADDING NEW VIDEO
    const PostVideo = async (token) => {
        try {
            const formData = new FormData();
            formData.append('video', selectedFile);
            formData.append('language', language);
            const res = await axios.post(`/admin/lessons/lesson/edit/video/${lessonId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress(progress);
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setRefetch(!refetch)
            setLoadingUpload(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                PostVideo(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err)
                setLoadingUpload(false)
            }
        }
    };

    const handlePostVideo = () => {
        setLoadingUpload(true)
        PostVideo(accessToken)
    }




    // EDIT VIDEO
    const EditVideo = async (token) => {
        try {
            const formData = new FormData();
            formData.append('video', selectedFile);
            const res = await axios.patch(`/admin/lessons/lesson/edit/video/?lessonId=${lessonId}&language=${language}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress(progress);
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully Edited ! ! !');
            setRefetch(!refetch)
            setLoadingUpload(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                EditVideo(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err)
                setLoadingUpload(false)
            }
        }
    };

    const handleEditVideo = () => {
        setLoadingUpload(true)
        EditVideo(accessToken)
    }



    // DELETE VIDEO
    const DeleteVideo = async (token) => {
        try {
            const res = await axios.delete(`admin/lessons/lesson/edit/video/?lessonId=${lessonId}&language=${language}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setDeleteMsg('Successfully Deleted ! ! !');
            setRefetch(!refetch)
            setDeleteLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                DeleteVideo(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setDeleteMsg(err.response.data.err)
                setDeleteLoading(false)
            }
        }
    };

    const handleDeleteVideo = () => {
        setDeleteLoading(true)
        DeleteVideo(accessToken)
    }




    return (
        <>
            <h3 className='uzbek-russian-edit'>{isChecked ? 'Uzbek / Russian' : 'English'}</h3>

            {/* CHECK - BOX */}

            <div className='video-checkbox-edit'>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            </div>

            {/* SHOw ADD CARD */}
            {addVideoCard && (
                <div className='add-video-confirmation-overlay'>
                    <div className='add-video-confirmation-card'>
                        {loadingUpload ? (
                            <div className='video-box-add-upload'>
                                {uploadProgress < 100 ? (
                                    <div className='upload-progress'>
                                        <div className='progress-bar-add-video'>
                                            <div className='fill' style={{ width: `${uploadProgress}%` }}></div>
                                        </div>
                                        <div className='progress-text-add-video'>{uploadProgress}%</div>
                                    </div>
                                ) : (
                                    <div className='loading-add-video-edit'>
                                        <div className='loading-circle-user'></div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <div className='video-box-add-upload'>
                                    <p className={errorMsg === "Successfully uploaded ! ! !" ? "error-msg-add-video-green" : 'error-msg-add-video'}>{errorMsg}</p>
                                    <p className='add-video-title'>Add New Video</p>
                                    <div className='add-video-container'>
                                        <div className='add-video-upload-edit'>
                                            <label htmlFor="video-upload-edit" className="upload-label-edit">
                                                {!uploaded ? (
                                                    <>
                                                        <AiOutlineVideoCameraAdd />
                                                        <span>Upload Video</span>
                                                    </>
                                                ) : (
                                                    <div className='check-video-before-add'>
                                                        <video src={previewVideo} alt="selected-file" controls={true} />
                                                    </div>
                                                )}
                                            </label>
                                            <input type="file" id="video-upload-edit" onChange={handleFileChange} className="upload-input-edit" accept="video/*" />
                                        </div>
                                    </div>
                                    <select onChange={(e) => setLanguage(e.target.value)} className='add-video-edit-select'>
                                        <option value="choose">Language</option>
                                        <option value="uzbek">Uzbek</option>
                                        <option value="russian">Russian</option>
                                        <option value="english">English</option>
                                    </select>
                                    <button onClick={handlePostVideo}>Upload video</button>
                                    <button onClick={handleEditVideo}>Edit video</button>
                                </div>
                                <button onClick={() => setAddVideoCard(false)} className='go-back-add-edit-video'>Go Back</button>
                                <button onClick={() => {
                                    setErrorMsg('');
                                    setLanguage('');
                                    setUploaded(false);
                                    setSelectedFile(null);
                                    setPreviewVideo(null)
                                }} className='go-back-add-edit-video-blue'>Clean All</button>
                            </div>
                        )}
                    </div>
                </div>
            )}



            {/* DELETE CONFIRMATION CARD */}
            {
                deleteCard && (
                    <div className='add-video-confirmation-overlay'>
                        <div className='add-video-confirmation-card'>
                            <p className='add-video-title'>Choose Language and Delete Video</p>
                            <p className={errorMsg === "Successfully uploaded ! ! !" ? "error-msg-add-video-green" : 'error-msg-add-video'}>{deleteMsg}</p>
                            {deleteLoading ? (
                                <div style={{ marginTop: "20px" }} className='loading-add-video-edit'>
                                    <div className='loading-circle-user'></div>
                                </div>
                            ) : (
                                <>
                                    <div className='deleteVideo'>
                                        <div className='delete-select-video'>
                                            <select onChange={(e) => setLanguage(e.target.value)} className='add-video-edit-select'>
                                                <option value="choose">Language</option>
                                                <option value="uzbek">Uzbek</option>
                                                <option value="russian">Russian</option>
                                                <option value="english">English</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button onClick={handleDeleteVideo} className='go-back-add-edit-video'>Delete</button>
                                    <button onClick={() => setDeleteCard(false)} className='go-back-add-edit-video-blue'>Cancel</button>
                                </>
                            )}
                        </div>
                    </div>
                )
            }


            <div className='edit-upload-video'>

                {
                    isChecked ? (

                        <>

                            {/* VIDEO 1 ( UZ ) */}

                            <div className="edit-video-1">
                                <div id="video-input-edit"></div>
                                <label htmlFor="video-input-label-edit">
                                    <div className="video-icon-edit">
                                        {
                                            findUrlByLanguage('uzbek') ? (
                                                <video src={findUrlByLanguage('uzbek')} alt="edited-video" controls={true} />
                                            ) : (
                                                <div>No Video</div>
                                            )
                                        }
                                    </div>
                                    <span className="video-name-edit">Uzbek Video</span>
                                </label>
                            </div>

                            {/* VIDEO 2 ( RU ) */}

                            <div className="edit-video-2">
                                <div id="video-input-edit"></div>
                                <label htmlFor="video-input-label-edit">
                                    <div className="video-icon-edit">
                                        {
                                            findUrlByLanguage('russian') ? (
                                                <video src={findUrlByLanguage('russian')} alt="edited-video" controls={true} />
                                            ) : (
                                                <div>No Video</div>
                                            )
                                        }
                                    </div>
                                    <span className="video-name-edit">Russian Video</span>
                                </label>
                            </div>
                        </>

                    ) : (
                        <>
                            {/* VIDEO 3 ( ENG ) */}

                            <div className="upload-video">
                                <div id="video-input-edit"></div>
                                <label htmlFor="video-input-label-edit">
                                    <div className="video-icon-edit">
                                        {
                                            findUrlByLanguage('english') ? (
                                                <video src={findUrlByLanguage('english')} alt="edited-video" controls={true} />
                                            ) : (
                                                <div>No Video</div>
                                            )
                                        }
                                    </div>
                                    <span className="video-name-edit">English Video</span>
                                </label>
                            </div>
                        </>
                    )
                }

            </div>
            <br />
            <br />
            <br />
            <br />
            <br />

        </>
    )
}

export default EditVideos