import React, { useState } from 'react';
import { AiOutlineVideoCameraAdd } from "react-icons/ai";

const AddVideo = () => {
    // UPLOAD IMAGES
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const [isChecked, setIsChecked] = useState(false); // Checkbox 

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Create a preview URL for the selected image
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        setUploaded(true)
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle checkbox state
    };

    return (
        <>
            <h3 className='uzbek-russian'>{isChecked ? 'Uzbek / Russian' : 'English'}</h3>

            {/* CHECK - BOX */}
            <div className='video-checkbox'>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            </div>

            <div className='video-upload-video'>

                {
                    isChecked ? (

                        <>

                            {/* VIDEO 1 ( UZ ) */}

                            < div className="upload-video-1">
                                <input
                                    type="file"
                                    id="video-input"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="video-input">
                                    <div className="video-icon">
                                        {
                                            !uploaded ? <AiOutlineVideoCameraAdd /> : (
                                                <img src={previewImage} alt="selected-file" />
                                            )
                                        }
                                    </div>
                                    <span className="video-name">{selectedFile ? selectedFile.name : 'Choose a file'}</span>
                                </label>
                            </div>

                            {/* VIDEO 2 ( RU ) */}

                            <div className="upload-video-2">
                                <input
                                    type="file"
                                    id="video-input"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="video-input">
                                    <div className="video-icon">
                                        {
                                            !uploaded ? <AiOutlineVideoCameraAdd /> : (
                                                <video src={previewImage} alt="selected-file" controls='true' />
                                            )
                                        }
                                    </div>
                                    <span className="video-name">{selectedFile ? selectedFile.name : 'Choose a file'}</span>
                                </label>
                            </div>
                        </>

                    ) : (
                        <>
                            {/* VIDEO 3 ( ENG ) */}

                            <div className="upload-video">
                                <input
                                    type="file"
                                    id="video-input"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="video-input">
                                    <div className="video-icon">
                                        {
                                            !uploaded ? <AiOutlineVideoCameraAdd /> : (
                                                <img src={previewImage} alt="selected-file" />
                                            )
                                        }
                                    </div>
                                    <span className="video-name">{selectedFile ? selectedFile.name : 'Choose a file'}</span>
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

export default AddVideo