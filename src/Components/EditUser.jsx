import React, { useState } from 'react';
import { useGlobalContext } from '../context/context';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const EditUser = () => {
    const { userProfilePage, refreshAccessToken, user, changeProfileImage, setChangeProfileImage } = useGlobalContext();

    // Loading
    const [profileLoading, setProfileLoading] = useState(false);

    // Name Loading 
    const [nameLoading, setNameLoading] = useState(false);

    // UseState of Change Name Logic
    const { name, email, course } = userProfilePage
    const [editName, setEditName] = useState(false);
    const [err, setErr] = useState('Edit Your Name');
    const [userName, setUserName] = useState('');

    // UseState Of Change Password Logic
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordSave, setPasswordSave] = useState(false);
    const [oldErr, setOldErr] = useState('Old Password');
    const [newErr, setNewErr] = useState('New Password');
    const [successMessage, setSuccessMessage] = useState('');

    const { accessToken } = user;

    // Profile Name change logic

    const ProfileName = async (token, name) => {
        try {
            const res = await axios.patch('/user/edit/profile/name', {
                name
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            // console.log(res.data);
            setEditName(false)
            setNameLoading(false)
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                ProfileName(refreshedToken, name); // try the request again with the new token
            } else {
                console.log(err);
            }
        }
    };


    // User Password Change
    const ProfilePassword = async (token, oldPassword, newPassword) => {
        try {
            const res = await axios.patch('/user/edit/profile/password', {
                oldPassword,
                newPassword
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            console.log(res.data);
            setPasswordSave(false)
            setSuccessMessage('Successfully updated ! ! !')
            setProfileLoading(false)
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                ProfilePassword(refreshedToken, name); // try the request again with the new token
            } else {
                console.log(err);
                console.log(err.response.data.err);
                setNewErr(err.response.data.err);
                setOldErr(err.response.data.err);
            }
        }
    };

    // Name change Function 

    const handleNameChange = () => {
        setNameLoading(true)
        if (userName === "") {
            setErr('Please fill the input')
        } else {
            ProfileName(accessToken, userName)
            setChangeProfileImage(!changeProfileImage)
            setErr("Your name has been updated ! ! !")
        }
    }


    // Password Change Function
    const handlePassword = () => {
        setProfileLoading(true)
        if (oldPassword === "" || newPassword === "") {
            setOldErr('Please enter your old Password')
            setNewErr('Please enter your new Password')
        } else {
            ProfilePassword(accessToken, oldPassword, newPassword)
        }
    }


    return (
        <>
            <div>
                <div className='profile-name'>
                    <div className='name-loading'>

                        <h1>User Name:</h1>

                        {nameLoading &&
                            <div className="loading-profile-container">
                                <div className="loading-profile-spinner"></div>
                            </div>
                        }

                    </div>
                    {
                        editName ? (
                            <>
                                <p className={err === "Please fill the input" ? "edit-name-red" : 'edit-name'}>{err}</p>
                                <input value={userName} onChange={(e) => setUserName(e.target.value)} className='user-edit-name' type="text" placeholder='Name...' />
                            </>
                        ) : (
                            <h2>{name}</h2>
                        )
                    }
                </div>
                {
                    editName ? (
                        <div onClick={handleNameChange} className='profile-name-btn'>
                            <button type='button'>Save</button>
                        </div>
                    ) : (
                        <div onClick={() => setEditName(true)} className='profile-name-btn'>
                            <button type='button'>Edit</button>
                        </div>
                    )
                }
            </div >
            <div>
                <div className='profile-name'>
                    <h1>Email:</h1>
                    <h2>{email}</h2>
                </div>
            </div>
            <div>
                <div className='profile-name'>

                    <div className='name-loading'>

                        <h1>Password:</h1>

                        {profileLoading &&
                            <div className="loading-profile-container">
                                <div className="loading-profile-spinner"></div>
                            </div>
                        }

                    </div>

                    {
                        passwordSave ? (
                            <>
                                {/* Old Password */}

                                <p className={oldErr === 'Old Password' ? "edit-old-password" : 'edit-old-password-red'}>{oldErr}</p>
                                <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className='user-edit-name' type="text" placeholder='Password...' />

                                {/* New Password */}

                                <p className={newErr === 'New Password' ? "edit-new-password" : 'edit-new-password-red'}>{newErr}</p>
                                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='user-edit-name' type="text" placeholder='Password...' />
                            </>
                        ) : (
                            <>
                                <p className='edit-old-password'>{successMessage}</p>
                                <h2>*****</h2>
                            </>
                        )
                    }

                </div>
                {
                    passwordSave ? (
                        <div onClick={handlePassword} className='profile-name-btn'>
                            <button type='button'>Save</button>
                        </div>
                    ) : (
                        <div onClick={() => setPasswordSave(true)} className='profile-name-btn'>
                            <button type='button'>Change</button>
                        </div>
                    )
                }
            </div>
            <div>
                <div className='profile-name'>
                    <h1>Current Level:</h1>
                    <h2>{course}</h2>
                </div>
            </div>
            <br />
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <div className='go-home-profile'>
                    <button type="button">Go Home</button>
                </div>
            </Link>

        </>
    )
}

export default EditUser
