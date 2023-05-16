import React, { useEffect, useState } from 'react'
import "../../css/ProfileCSS/profile.css"
import ProfileBanner from '../../Components/ProfileBanner'
import ProfilePictures from '../../Components/ProfilePictures'
import EditUser from '../../Components/EditUser'
import Footer from '../../Components/Footer';
import { useGlobalContext } from '../../context/context'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../Components'

const Profile = () => {

    const { user, refreshAccessToken, isAccessTokenExpired, userProfilePage, setUserProfilePage, avatars, setAvatars, changeProfileImage, setChangeProfileImage } = useGlobalContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const refreshToken = localStorage.getItem('refreshToken');

    const useToken = () => {
        const { accessToken } = user;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

        const fetchUserProfile = async (token) => {
            try {
                const res = await axios.get('/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data);
                const { user, avatars } = res.data;
                setUserProfilePage(user);
                setAvatars(avatars);
                setIsLoading(false);
            } catch (err) {
                if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                    const refreshedToken = await refreshAccessToken(); // refresh the token
                    fetchUserProfile(refreshedToken); // try the request again with the new token
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
                    await fetchUserProfile(token);
                }
            };
            fetch();
        }, [changeProfileImage]);

        useEffect(() => {
            const timer = setInterval(() => {
                refreshAccessToken()
                    .then((token) => fetchUserProfile(token))
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

    if (isLoading) {
        return <Loading />
    }


    if (!refreshToken) {
        return navigate('/login') // Render loading spinner
    }


    return (
        <div>
            <ProfileBanner />
            <br />
            <hr />
            <br />
            <ProfilePictures />
            <br />
            <hr />
            <br />
            <EditUser />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export default Profile
