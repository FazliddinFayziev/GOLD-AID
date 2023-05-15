import '../css/HomeCSS/navbar.css';
import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { hambook, logo, profile } from '../assets';
import { useGlobalContext } from '../context/context';
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Navbar = () => {

    // GLOBAL
    const { bgColor, setBgColor, userProfilePicture } = useGlobalContext();
    const { profilePicture } = userProfilePicture

    // LOCAL
    const [nav, setNav] = useState(false);

    return (
        <>
            <div className='container-home-navbar'>
                {/* IMAGE DIV */}
                <Link to={'/'}>
                    <div>
                        <div className='logo-img'>
                            <img src={logo} alt="gold-aid" />
                        </div>
                    </div>
                </Link>

                {/* NAVBAR OTHER SIDE DIV */}
                <div className='home-navbar-about'>
                    <ul>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                    <div
                        className={`home-navbar-icon ${bgColor ? 'animate' : ''}`}
                        onClick={() => setBgColor(!bgColor)}
                    >
                        {bgColor ? <BsFillMoonFill fontSize={30} color='#fff' /> : <BsFillSunFill fontSize={30} color='#fff' />}
                    </div>

                    {/* PROFILE IMAGE */}

                    <div className='home-navbar-profile-picture'>
                        <img
                            src={profilePicture ? profilePicture : profile}
                            alt='gold-aid-profile-image'
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop if the default image also fails to load
                                e.target.src = profile; // Display the default profile image
                            }}
                        />
                    </div>


                    {/* NAVBAR @MEDIA HAMBURGER */}
                    <div
                        onClick={() => setNav(true)}
                        className='hambook-container'
                    >
                        <img src={hambook} alt="hambook" />
                    </div>
                </div>
            </div>

            {/* @MEDIA OPEN NAVBAR MENU */}
            <div className='navbar-sidebar'>
                <div className={nav ? 'navbar-menu-show' : 'navbar-menu-hidden'}>
                    <div className={nav ? 'navbar-menu-box-show' : 'navbar-menu-box-hidden'}>
                        <div
                            onClick={() => setNav(false)}
                            className='navbar-menu-icon'
                        >
                            <AiOutlineClose className='navbar-menu-close' fontSize={30} />
                        </div>
                        <div className='navbar-menu-container-img'>

                            {/* PROFILE IMAGE */}

                            <div className='navbar-menu-img'>
                                <img
                                    src={profilePicture ? profilePicture : profile}
                                    alt='gold-aid-profile-image'
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevent infinite loop if the default image also fails to load
                                        e.target.src = profile; // Display the default profile image
                                    }}
                                />
                            </div>
                        </div>
                        <div className='navbar-menu-text'>
                            <ul>
                                <li>About</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
