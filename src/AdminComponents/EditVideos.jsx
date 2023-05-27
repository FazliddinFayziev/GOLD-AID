import React, { useState } from 'react';
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { useGlobalContext } from '../context/context';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';

const EditVideos = ({ addVideoCard, setAddVideoCard }) => {
    const { refreshAccessToken, user } = useGlobalContext();
    const { lessonId } = useParams();
    const { accessToken } = user;
    // EDIT IMAGES
    const [isChecked, setIsChecked] = useState(false); // Checkbox 
    const { singleAdminLesson, setSingleAdminLesson } = useGlobalContext();
    const [language, setLanguage] = useState('');


    const [selectedFile, setSelectedFile] = useState(null);
    const [previewVideo, setPreviewVideo] = useState(null);
    const [uploaded, setUploaded] = useState(false);

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
        // setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('video', selectedFile);
            formData.append('language', language);
            const res = await axios.post(`/admin/lessons/lesson/edit/video/${lessonId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            // setErrorMsg('Successfully uploaded ! ! !');
            // setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                PostVideo(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                // setErrorMsg(err.response.data.err)
                // setIsLoading(false)
            }
        }
    };

    const handlePostVideo = () => {
        PostVideo(accessToken)
    }

    return (
        <>
            <h3 className='uzbek-russian-edit'>{isChecked ? 'Uzbek / Russian' : 'English'}</h3>

            {/* CHECK - BOX */}

            <div className='video-checkbox-edit'>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            </div>

            {/* SHOX ADD CARD */}
            {addVideoCard && (
                <div className='add-video-confirmation-overlay'>
                    <div className='add-video-confirmation-card'>
                        <div className='video-box-add-upload'>
                            <p>Add New Video</p>
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
                        </div>
                        <button onClick={() => setAddVideoCard(false)} className='go-back-add-edit-video'>Go Back</button>
                    </div>
                </div>
            )}



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