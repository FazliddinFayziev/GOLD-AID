import React, { useEffect, useState } from 'react';
import "../../css/AdminCSS/images.css";
import { useGlobalContext } from '../../context/context';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { BiMessageSquareEdit } from "react-icons/bi";

const DefaultImages = () => {
    const { user, refreshAccessToken, isRefreshTokenExpired } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [showCard, setShowCard] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [typeImages, setTypeImages] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [image, setImage] = useState([]);
    const navigate = useNavigate();


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const { accessToken } = user;


    // UPLOAD Default Image
    const UploadImage = async (token) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);
            formData.append('type', typeImages);
            const res = await axios.patch(`/admin/images/update/default/image`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setSelectedImage(null);
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                UploadImage(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err);
                setIsLoading(false);
            }
        }
    };


    // HANDLE UPDATE 

    const handleUpdate = () => {
        setShowCard(false)
        UploadImage(accessToken)
    }


    // Set error Message false after 10 second
    useEffect(() => {
        setTimeout(() => setErrorMsg(''), 10000);
    }, [errorMsg]);



    // GET DEFAULT IMAGES
    const useToken = () => {

        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshTokenExpireTime = localStorage.getItem('refreshTokenExpireTime');


        const fetchAllImages = async (token) => {
            try {
                const res = await axios.get(`/admin/images/default`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                const { images } = res.data
                setImage(images);
                setIsLoading(false);
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchAllImages(refreshedToken); // try the request again with the new token
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
                    await fetchAllImages(token);
                }
            };
            fetch();
        }, [refetch]);

        useEffect(() => {
            const fetch = async () => {
                const token = await refreshAccessToken();
                if (!token) {
                    navigate('/register');
                } else {
                    await fetchAllImages(token);
                }
            };
            fetch();
        }, []);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchAllImages(token))
                    .catch((err) => console.log(err));
            }, 3000000); // fetches new urls and tokens every 50 minutes
            return () => clearInterval(timer);
        }, []);

        useEffect(() => {
            if (!refreshToken || !refreshTokenExpireTime) {
                navigate('/register');
            }
            else if (isRefreshTokenExpired()) {
                navigate('/login');
            }
        }, []);

        return accessToken;
    };

    const getAccess = useToken();

    return (
        <div className="images-page">
            <h2>Default Images</h2>
            <div className={errorMsg === 'Successfully uploaded ! ! !' ? 'add-lesson-add-error-green' : 'add-lesson-add-error'}>
                {errorMsg}
            </div>
            <div>
                {isLoading ? (
                    <div className='loading-users'>
                        <div className="loading-circle-user"></div>
                    </div>
                ) : (
                    <div className='default-images'>

                        {showCard && (
                            <div className='delete-confirmation-overlay'>
                                <div className='delete-confirmation-card'>
                                    <h3>Update Default Image</h3>
                                    <div className='confirmation-buttons'>
                                        <input type="file" onChange={handleFileChange} />
                                        <button className='update-default-image' onClick={handleUpdate}>update</button>
                                        <button className='confirm-delete-button' onClick={() => setShowCard(false)}>cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {image?.map((img) => {
                            const { awsKey, role, _id, imageUrl } = img
                            return (

                                <div key={_id} className='image'>
                                    <div key={_id}>
                                        <img src={imageUrl} alt="default-image" />
                                    </div>
                                    <p>{role}</p>
                                    <div className='edit-default-image-box'>
                                        <div onClick={() => {
                                            setTypeImages(role);
                                            setShowCard(true);
                                        }} className='edit-default-image'>
                                            <BiMessageSquareEdit fontSize={50} />
                                        </div>
                                    </div>
                                </div>

                            )
                        })}

                    </div>
                )
                }
            </div>
        </div>
    )
}

export default DefaultImages