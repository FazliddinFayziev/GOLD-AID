import React, { useEffect, useState } from 'react';
import "../../css/AdminCSS/addlesson.css"
import { ImUpload } from "react-icons/im";
import AddVideo from '../AddVideo';
import { useGlobalContext } from '../../context/context';
import axios from '../../api/axios';


const AddLesson = () => {

    const { isChecked, setIsChecked, user, refreshAccessToken, selectedFileEng, setSelectedFileEng, selectedFileRu, setSelectedFileRu, selectedFileUz, setSelectedFileUz } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // UPLOAD IMAGES
    // BOX-1
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // UPLOAD TITLE AND SO ON
    //BOX-2
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [course, setCourse] = useState('beginner')



    const [uploaded, setUploaded] = useState(false);

    // UPLOAD TITLE AND SO ON



    // UPLOAD FILE
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



    const { accessToken } = user;

    // POST ENGLISH VIDEOS

    const PostEnglish = async (token) => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('video', selectedFileEng);
            formData.append('jsondata', JSON.stringify({
                course,
                title,
                description
            }));
            const res = await axios.post('/admin/lessons/english', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setSelectedFile(null);
            setPreviewImage(null);
            setSelectedFile(null);
            setDescription('');
            setUploaded(false);
            setTitle('');
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                PostEnglish(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err)
                setIsLoading(false)
            }
        }
    };

    // POST RUSSIAN AND UZBEK VIDEO

    const PostUzAndRu = async (token) => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('videoUz', selectedFileUz);
            formData.append('videoRu', selectedFileRu);
            formData.append('jsondata', JSON.stringify({
                course,
                title,
                description
            }));
            const res = await axios.post('/admin/lessons/ruz', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setSelectedFile(null);
            setPreviewImage(null);
            setSelectedFile(null);
            setDescription('');
            setUploaded(false);
            setTitle('');
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                PostUzAndRu(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err)
                setIsLoading(false)
            }
        }
    };

    const hadleUploadEng = () => {
        PostEnglish(accessToken)
    }

    const handleUploadUzAndRu = () => {
        PostUzAndRu(accessToken)
    }

    if (isLoading) {
        return (
            <div className='loading-users'>
                <div className="loading-circle-user"></div>
            </div>
        )
    }


    return (
        <div className='add-lesson-container'>
            <div className='add-lesson-title'>
                Add Lesson
            </div>
            <div className={errorMsg === 'Successfully uploaded ! ! !' ? 'add-lesson-add-error-green' : 'add-lesson-add-error'}>
                {errorMsg}
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
                            <input value={title} type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='upload-add-lesson-title'>
                            <h4>Description:</h4>
                            <br />
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="comment" form="usrform" placeholder='Text...'></textarea>
                        </div>
                        <div className='upload-add-lesson-title'>
                            <h4>Course</h4>
                            <br />
                            <select onChange={(e) => setCourse(e.target.value)} name='course'>
                                <option value="beginner">Beginner</option>
                                <option value="elementary">Elementary</option>
                                <option value="pre-intermediate">Pre-intermediate</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="upper-intermediate">UPPER-INTERMEDIATE</option>
                                <option value="ielts">IELTS</option>
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

            {isChecked ? (
                <div onClick={handleUploadUzAndRu} className='add-lesson-button'>
                    <button>Upload (RUZ)</button>
                </div>
            ) : (
                <div onClick={hadleUploadEng} className='add-lesson-button'>
                    <button>Upload (ENG)</button>
                </div>
            )
            }

        </div>
    )
}

export default AddLesson
