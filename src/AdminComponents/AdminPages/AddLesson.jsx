import React, { useState } from 'react';
import "../../css/AdminCSS/addlesson.css"
import { ImUpload } from "react-icons/im";
import AddVideo from '../AddVideo';


const AddLesson = () => {

    // UPLOAD IMAGES
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [uploaded, setUploaded] = useState(false);

    // UPLOAD TITLE AND SO ON


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

    return (
        <div className='add-lesson-container'>
            <div className='add-lesson-title'>
                Add Lesson
            </div>
            <div className='upload-container'>

                {/* BOX - 1 */}

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
                        </label>
                    </div>
                </div>

                {/* BOX - 2 */}

                <div className='upload-box-2'>
                    <div>
                        <div className='upload-add-lesson-title'>
                            <h4>Title: </h4>
                            <br />
                            <input type="text" placeholder='Title' />
                        </div>
                        <div className='upload-add-lesson-title'>
                            <h4>Description:</h4>
                            <br />
                            <textarea name="comment" form="usrform" placeholder='Text...'></textarea>
                        </div>
                        <div className='upload-add-lesson-title'>
                            <h4>Course</h4>
                            <br />
                            <select name='course'>
                                <option value="beginner">Beginner</option>
                                <option value="elementary">Elementary</option>
                                <option value="pre-intermediate">Pre-intermediate</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="upper-intermediate">IELTS</option>
                                <option value="ielts"></option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* VIDEOS */}
            <div>
                <div className='video-upload-title'>
                    <h1 className='black'>Video</h1>
                </div>

                <AddVideo />

            </div>

        </div>
    )
}

// { "course": "beginner", 
// "title": "I guess i love u", 
// "description": "here you will learn a lot" }

export default AddLesson
