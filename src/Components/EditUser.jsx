import React, { useState } from 'react';
import { useGlobalContext } from '../context/context';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const EditUser = () => {
    const { userProfilePage, refreshAccessToken, user, changeProfileImage, setChangeProfileImage } = useGlobalContext();
    const { name, email, course } = userProfilePage
    const [editName, setEditName] = useState(false);
    const [err, setErr] = useState('Edit Your Name');
    const [userName, setUserName] = useState('');

    const { accessToken } = user;

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
            console.log(res.data);
            setEditName(false)
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                ProfileName(refreshedToken, name); // try the request again with the new token
            } else {
                console.log(err);
            }
        }
    };

    const handleNameChange = () => {
        if (userName === "") {
            setErr('Please fill the input')
        } else {
            ProfileName(accessToken, userName)
            setChangeProfileImage(!changeProfileImage)
            setErr("Your name has been updated ! ! !")
        }
    }
    return (
        <>
            <div>
                <div className='profile-name'>
                    <h1>User Name:</h1>
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
                <div className='profile-name-btn'>
                    <button type='button'>Edit</button>
                </div>
            </div>
            <div>
                <div className='profile-name'>
                    <h1>Current Level:</h1>
                    <h2>{course}</h2>
                </div>
            </div>
            <br />
            <Link to={`/`}>
                <div className='go-home-profile'>
                    <button type="button">Go Home</button>
                </div>
            </Link>
        </>
    )
}

export default EditUser
