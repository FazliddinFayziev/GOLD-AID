import React, { useState } from 'react';
import { useGlobalContext } from '../context/context';
import axios from '../api/axios';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const ProfilePictures = () => {
    const { userProfilePage, avatars, isAccessTokenExpired, refreshAccessToken, user, changeProfileImage, setChangeProfileImage } = useGlobalContext();
    const { profilePicture } = userProfilePage;
    const navigate = useNavigate();
    const [current, setCurrent] = useState('');
    const [chooseImage, setchooseImage] = useState('Choose your favorite avatar');
    // const [isLoading, setIsLoading] = useState(false)

    const refreshToken = localStorage.getItem('refreshToken');

    const { accessToken } = user;


    const ProfileImage = async (token, awsKey) => {
        try {
            const res = await axios.patch('/user/edit/profile/picture', {
                imageKey: awsKey
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(res.data);
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                ProfileImage(refreshedToken, awsKey); // try the request again with the new token
            } else {
                console.log(err);
            }
        }
    };


    const handleImageClick = (awsCode) => {
        setCurrent(awsCode);
    };


    const handleChangeImage = () => {
        if (current === '') {
            setchooseImage('Choose Image')
        } else {
            ProfileImage(accessToken, current)
            setchooseImage('image has been updated')
            setChangeProfileImage(!changeProfileImage)
        }
    }



    // if (isLoading) {
    //     return <Loading />
    // }


    if (!refreshToken) {
        return navigate('/login') // Render loading spinner
    }


    return (
        <>
            <div className='profile-pictures'>
                <h1>Profile pictures:</h1>
                <h3 className={chooseImage === "Choose Image" ? 'choose-image-red' : 'choose-image-green'}>{chooseImage}</h3>
            </div>
            <div className='profile-pictures-container'>
                <div>
                    {avatars.map((profile) => {
                        const { id, url, awsKey } = profile;
                        return (
                            <div className='pr-img-con' key={id}>
                                <div
                                    className={awsKey === current ? 'pr-img-active' : 'pr-img'}
                                    onClick={() => handleImageClick(awsKey)} // Add onClick event handler
                                >
                                    <img src={url} alt='profile-images' />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div onClick={handleChangeImage} className='profile-save-btn'>
                <button type='button'>save</button>
            </div>
        </>
    );
};

export default ProfilePictures;
