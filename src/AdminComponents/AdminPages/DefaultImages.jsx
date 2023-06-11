import React, { useEffect, useState } from 'react';
import "../../css/AdminCSS/images.css";
import { useGlobalContext } from '../../context/context';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { lessons_default } from '../../assets';
import { BiMessageSquareEdit } from "react-icons/bi";

const DefaultImages = () => {
    const { user, refreshAccessToken, isRefreshTokenExpired } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [updateImages, setUpdateImages] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [image, setImage] = useState([]);
    const navigate = useNavigate();



    // UPLOAD Default Image
    const UploadImage = async (token) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);
            const res = await axios.post(`/admin/images/avatars`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setSelectedImage(null);
            setPreview(null);
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
            <div>
                {isLoading ? (
                    <div className='loading-users'>
                        <div className="loading-circle-user"></div>
                    </div>
                ) : (
                    <div className='default-images'>

                        {image?.map((img) => {
                            const { awsKey, role, _id } = img
                            return (
                                <>
                                    <div key={_id} className='image'>
                                        <div key={_id}>
                                            <img src={lessons_default} alt="default-image" />
                                        </div>
                                        <p>{role}</p>
                                        <div className='edit-default-image-box'>
                                            <div className='edit-default-image'>
                                                <BiMessageSquareEdit fontSize={50} />
                                            </div>
                                        </div>
                                    </div>
                                </>
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