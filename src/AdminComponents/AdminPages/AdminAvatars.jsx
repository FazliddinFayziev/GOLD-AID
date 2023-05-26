import React, { useEffect, useState } from 'react';
import '../../css/AdminCSS/avatars.css';
import { useGlobalContext } from '../../context/context';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const AdminAvatars = () => {
    const { refreshAccessToken, user, isAccessTokenExpired } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const [avatar, setAvatar] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedAvatar(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleAddAvatar = () => {
        if (selectedAvatar) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatars([...avatars, event.target.result]);
                setSelectedAvatar(null);
                setPreview(null);
            };
            reader.readAsDataURL(selectedAvatar);
        }
    };

    const handleDeleteAvatar = (index) => {
        const updatedAvatars = [...avatars];
        updatedAvatars.splice(index, 1);
        setAvatars(updatedAvatars);
    };


    const useToken = () => {

        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

        const fetchAllAvatars = async (token) => {
            try {
                const res = await axios.get(`/admin/images/avatars`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
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
        }, []);

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
            if (!refreshToken || !accessTokenExpireTime) {
                navigate('/register');
            }
            else if (isAccessTokenExpired()) {
                navigate('/login');
            }
        }, []);

        return accessToken;
    };

    const accessToken = useToken();

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
            <div className="avatar-list">
                {avatar?.map((mainAvatar, index) => (
                    <>
                        <div className="avatar-item" key={index}>
                            <div className='avatar-image'>
                                <img src={mainAvatar.url} alt={`Avatar ${index + 1}`} />
                            </div>
                            <div className="avatar-actions">
                                <button className='delete-avatar' onClick={() => handleDeleteAvatar(index)}>Delete</button>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default AdminAvatars;
