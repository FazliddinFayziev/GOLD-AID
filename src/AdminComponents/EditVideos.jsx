import React, { useState } from 'react';
import { AiOutlineVideoCameraAdd } from "react-icons/ai";

const EditVideos = () => {
    // EDIT IMAGES
    const [isChecked, setIsChecked] = useState(false); // Checkbox 


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle checkbox state
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
                                        <video src="https://www.google.com/search?q=video&rlz=1C1ONGR_enMY1035MY1035&oq=video+&aqs=chrome..69i57j69i59l2j69i61j69i60l4.2261j0j4&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:7c842fc1,vid:bef8QLNHubw" alt="edited-video" controls={true} />
                                    </div>
                                    <span className="video-name-edit">Edit Video</span>
                                </label>
                            </div>

                            {/* VIDEO 2 ( RU ) */}

                            <div className="edit-video-2">
                                <div id="video-input-edit"></div>
                                <label htmlFor="video-input-label-edit">
                                    <div className="video-icon-edit">
                                        <video src="https://www.google.com/search?q=video&rlz=1C1ONGR_enMY1035MY1035&oq=video+&aqs=chrome..69i57j69i59l2j69i61j69i60l4.2261j0j4&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:7c842fc1,vid:bef8QLNHubw" alt="edited-video" controls={true} />
                                    </div>
                                    <span className="video-name-edit">Edit Video</span>
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
                                        <video src="https://www.google.com/search?q=video&rlz=1C1ONGR_enMY1035MY1035&oq=video+&aqs=chrome..69i57j69i59l2j69i61j69i60l4.2261j0j4&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:7c842fc1,vid:bef8QLNHubw" alt="edited-video" controls={true} />
                                    </div>
                                    <span className="video-name-edit">Edit Video</span>
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