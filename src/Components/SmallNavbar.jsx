import React, { useState } from 'react';
import '../css/VideosCSS/smallNavbar.css';
import { AiOutlineClose } from "react-icons/ai";
import { hambook, logo, profile } from '../assets';
import { useGlobalContext } from '../context/context';
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';

const SmallNavbar = () => {

    // GLOBAL
    const { bgColor, setBgColor, userProfile, userProfilePicture, restart, setRestart } = useGlobalContext();
    const { profilePicture } = userProfilePicture
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
        setRestart(!restart);
    }

    // LOCAL
    const [nav, setNav] = useState(false);
    return (
        <>
            <div className='container-small-navbar'>
                {/* IMAGE DIV */}

                <div className='onclick' onClick={handleNavigate}>
                    <div className='small-logo-img'>
                        <img src={logo} alt="gold-aid" />
                    </div>
                </div>


                {/* NAVBAR OTHER SIDE DIV */}
                <div className='small-navbar-about'>
                    <ul>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                    <div
                        className={`small-navbar-icon ${bgColor ? 'small-animate' : ''}`}
                        onClick={() => setBgColor(!bgColor)}
                    >
                        {bgColor ? <BsFillMoonFill fontSize={30} color='#fff' /> : <BsFillSunFill fontSize={30} color='#fff' />}
                    </div>

                    <Link to={`/user/profile`}>
                        <div className='small-navbar-profile-picture'>
                            <img
                                src={profilePicture ? profilePicture : profile}
                                alt='gold-aid-profile-image'
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop if the default image also fails to load
                                    e.target.src = profile; // Display the default profile image
                                }}
                            />
                        </div>
                    </Link>


                    {/* NAVBAR @MEDIA HAMBURGER */}
                    <div
                        onClick={() => setNav(true)}
                        className='small-hambook-container'
                    >
                        <img src={hambook} alt="hambook" />
                    </div>
                </div>
            </div>

            {/* @MEDIA OPEN NAVBAR MENU */}
            {/* <div className='small-navbar-sidebar'> */}
            <div className={nav ? 'small-navbar-menu-show' : 'small-navbar-menu-hidden'}>
                <div className={nav ? 'small-navbar-menu-box-show' : 'small-navbar-menu-box-hidden'}>
                    <div
                        onClick={() => setNav(false)}
                        className='small-navbar-menu-icon'
                    >
                        <AiOutlineClose className='small-navbar-menu-close' fontSize={30} />
                    </div>
                    <div className='small-navbar-menu-container-img'>
                        <Link to={`/user/profile`}>
                            <div className='small-navbar-menu-img'>
                                <img
                                    src={profilePicture ? profilePicture : profile}
                                    alt='gold-aid-profile-image'
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop if the default image also fails to load
                                        e.target.src = profile; // Display the default profile image
                                    }}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className='small-navbar-menu-text'>
                        <ul>
                            <li>About</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default SmallNavbar
