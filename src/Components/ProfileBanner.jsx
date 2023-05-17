import React from 'react'
import { logo, profile } from '../assets';
import { BiLogOutCircle } from "react-icons/bi";
import { useGlobalContext } from '../context/context';
import { Link, useNavigate } from 'react-router-dom';

const ProfileBanner = () => {
    const { userProfilePage, setUser } = useGlobalContext();
    const { name, profilePicture } = userProfilePage

    const navigate = useNavigate();

    const handleLogOut = () => {
        setUser({})
        localStorage.setItem('refreshToken', '')
        return navigate('/login')
    }


    return (
        <>
            <div className="profile-banner">

                <div className="profile-banner-image" style={{ backgroundImage: `url("https://thumbs.dreamstime.com/b/open-book-hardback-books-wooden-table-education-background-back-to-school-copy-space-text-76106466.jpg")` }}>

                    <div className="profile-banner-cover">

                        <Link to={'/'}>
                            <img src={logo} alt="Logo" className="profile-banner-logo" />
                        </Link>

                        {/* LogOut Button */}

                        <button onClick={handleLogOut} className="profile-banner-logout-button">

                            <BiLogOutCircle fontSize={30} alt="Logout" className="hero-banner-logout-icon" />

                        </button>

                    </div>

                </div>

            </div>

            <div className='profile-page-img'>
                <div className='both-profile'>
                    <div className='profile-page-image'>
                        <div className='profile-page-image-container'>
                            <img
                                src={profilePicture ? profilePicture : profile}
                                alt="profile-image"
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop if the default image also fails to load
                                    e.target.src = profile; // Display the default profile image
                                }}
                            />
                        </div>
                    </div>
                    <h2 className='userName'>{name}</h2>
                </div>
            </div>
        </>
    );
}

export default ProfileBanner
