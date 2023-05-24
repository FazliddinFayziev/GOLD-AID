import React, { useState } from 'react';
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { useGlobalContext } from '../context/context';

const AddVideo = () => {

    const { isChecked, setIsChecked, selectedFileUz, setSelectedFileUz, selectedFileRu, setSelectedFileRu, selectedFileEng, setSelectedFileEng } = useGlobalContext();


    // UPLOAD UZBEK VIDEO
    const [previewVideoUz, setPreviewVideoUz] = useState(null);
    const [uploadedUz, setUploadedUz] = useState(false);

    // UPLOAD RUSSAIN VIDEO
    const [previewVideoRu, setPreviewVideoRu] = useState(null);
    const [uploadedRu, setUploadedRu] = useState(false);

    // UPLOAD ENGLISH VIDEO
    const [previewVideoEng, setPreviewVideoEng] = useState(null);
    const [uploadedEng, setUploadedEng] = useState(false);

    // UZBEK
    const handleFileChangeUz = (event) => {
        const file = event.target.files[0];
        setSelectedFileUz(file);

        // Create a preview URL for the selected image
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewVideoUz(reader.result);
        };
        reader.readAsDataURL(file);
        setUploadedUz(true)
    };

    // RUSSIAN
    const handleFileChangeRu = (event) => {
        const file = event.target.files[0];
        setSelectedFileRu(file);

        // Create a preview URL for the selected image
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewVideoRu(reader.result);
        };
        reader.readAsDataURL(file);
        setUploadedRu(true)
    };

    // ENGLISH
    const handleFileChangeEng = (event) => {
        const file = event.target.files[0];
        setSelectedFileEng(file);

        // Create a preview URL for the selected image
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewVideoEng(reader.result);
        };
        reader.readAsDataURL(file);
        setUploadedEng(true)
    };


    // CHECK BOX // CHANGE VIDEO ENGLISH
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
                                    id="video-input-uz"
                                    onChange={handleFileChangeUz}
                                />
                                <label htmlFor="video-input-uz">
                                    <div className="video-icon">
                                        {
                                            !uploadedUz ? <AiOutlineVideoCameraAdd /> : (
                                                <video src={previewVideoUz} alt="selected-file" controls={true} />
                                            )
                                        }
                                    </div>
                                    <span className="video-name">{selectedFileUz ? selectedFileUz.name : 'Choose a file'}</span>
                                </label>
                            </div>

                            {/* VIDEO 2 ( RU ) */}

                            <div className="upload-video-2">
                                <input
                                    type="file"
                                    id="video-input-ru"
                                    onChange={handleFileChangeRu}
                                />
                                <label htmlFor="video-input-ru">
                                    <div className="video-icon">
                                        {
                                            !uploadedRu ? <AiOutlineVideoCameraAdd /> : (
                                                <video src={previewVideoRu} alt="selected-file" controls={true} />
                                            )
                                        }
                                    </div>
                                    <span className="video-name">{selectedFileRu ? selectedFileRu.name : 'Choose a file'}</span>
                                </label>
                            </div>
                        </>

                    ) : (
                        <>
                            {/* VIDEO 3 ( ENG ) */}

                            <div className="upload-video">
                                <input
                                    type="file"
                                    id="video-input-eng"
                                    onChange={handleFileChangeEng}
                                />
                                <label htmlFor="video-input-eng">
                                    <div className="video-icon">
                                        {
                                            !uploadedEng ? <AiOutlineVideoCameraAdd /> : (
                                                <video src={previewVideoEng} alt="selected-file" controls={true} />
                                            )
                                        }
                                    </div>
                                    <span className="video-name">{selectedFileEng ? selectedFileEng.name : 'Choose a file'}</span>
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