import React, { useState } from 'react';
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { useGlobalContext } from '../context/context';

const EditVideos = ({ videos }) => {
    // EDIT IMAGES
    const [isChecked, setIsChecked] = useState(false); // Checkbox 
    const { singleAdminLesson, setSingleAdminLesson } = useGlobalContext();


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

    return (
        <>
            <h3 className='uzbek-russian-edit'>{isChecked ? 'Uzbek / Russian' : 'English'}</h3>

            {/* CHECK - BOX */}
            <div className='video-checkbox-edit'>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            </div>

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