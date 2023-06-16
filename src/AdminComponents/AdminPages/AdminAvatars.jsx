import React, { useEffect, useState } from 'react';
import '../../css/AdminCSS/avatars.css';
import { useGlobalContext } from '../../context/context';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const AdminAvatars = () => {
    const { refreshAccessToken, user, isRefreshTokenExpired } = useGlobalContext();
    const { accessToken } = user;
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const [avatar, setAvatar] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [getIdOfAvatar, setGetIdOfAvatar] = useState('');
    const [showCard, setShowCard] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedAvatar(file);
        setPreview(URL.createObjectURL(file));
    };


    // UPLOAD AVATARS
    const UploadAvatar = async (token) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', selectedAvatar);
            const res = await axios.post(`/admin/images/avatars`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(res.data);
            setErrorMsg('Successfully uploaded ! ! !');
            setSelectedAvatar(null);
            setPreview(null);
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                UploadAvatar(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err);
                setIsLoading(false);
            }
        }
    };

    const handleAddAvatar = () => {
        UploadAvatar(accessToken);
        setRefetch(!refetch);
    };




    // DELETE AVATAR

    const DeleteAvatar = async (token) => {
        setIsLoading(true);
        try {
            const res = await axios.delete(`/admin/images/avatars/${getIdOfAvatar}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(res.data);
            setErrorMsg('Successfully Deleted ! ! !');
            setIsLoading(false);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                DeleteAvatar(refreshedToken); // try the request again with the new token
            } else {
                console.log(err.response.data.err);
                setErrorMsg(err.response.data.err);
                setIsLoading(false);
            }
        }
    };

    const handleDeleteAvatar = () => {
        setShowCard(false);
        DeleteAvatar(accessToken);
        setRefetch(!refetch);
    };






    // GET AVATARS


    const useToken = () => {

        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');
        const refreshTokenExpireTime = localStorage.getItem('refreshTokenExpireTime');


        const fetchAllAvatars = async (token) => {
            try {
                const res = await axios.get(`/admin/images/avatars`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(res.data);
                const { avatars } = res.data
                setAvatar(avatars);
                setIsLoading(false);
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchAllAvatars(refreshedToken); // try the request again with the new token
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
                    await fetchAllAvatars(token);
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
                    await fetchAllAvatars(token);
                }
            };
            fetch();
        }, []);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchAllAvatars(token))
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
        <div className="avatars-page">
            <h2>Avatars Page</h2>
            <div className="avatar-input">
                <input type="file" onChange={handleFileChange} id="avatar-file" />
                <label htmlFor="avatar-file" className="add-avatar-btn">
                    Select Avatar
                </label>
                {preview && <img src={preview} alt="Preview" className="avatar-preview" />}
                <button onClick={handleAddAvatar} className="add-avatar-btn">
                    Add Avatar
                </button>
            </div>


            {/* SHOW DELETE CONFIRMATION CARD */}
            {showCard && (
                <div className='delete-confirmation-overlay'>
                    <div className='delete-confirmation-card'>
                        <h3>Are you sure you want to delete this Avatar?</h3>
                        <div className='confirmation-buttons'>
                            <button className='confirm-delete-button' onClick={handleDeleteAvatar}>Yes</button>
                            <button className='cancel-delete-button' onClick={() => setShowCard(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}


            {
                isLoading ? (
                    <div className='loading-users'>
                        <div className="loading-circle-user"></div>
                    </div>
                ) : (
                    <>
                        <div className={errorMsg === 'Successfully uploaded ! ! !' ? 'add-lesson-add-error-green' : 'add-lesson-add-error'}>
                            {errorMsg}
                        </div>
                        <div className="avatar-list">
                            {avatar?.map((mainAvatar, index) => (
                                <div className="avatar-item" key={index}>
                                    <div className='avatar-image'>
                                        <img src={mainAvatar.url} alt={`Avatar ${index + 1}`} />
                                    </div>
                                    <div className="avatar-actions">
                                        <button onClick={() => {
                                            setGetIdOfAvatar(mainAvatar.id);
                                            setShowCard(true)
                                        }} className='delete-avatar'>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default AdminAvatars;
