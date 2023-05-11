import React, { useState } from 'react';
import '../css/VideosCSS/smallNavbar.css';
import { AiOutlineClose } from "react-icons/ai";
import { hambook, logo, profile } from '../assets';
import { useGlobalContext } from '../context/context';
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const SmallNavbar = () => {

    // GLOBAL
    const { bgColor, setBgColor } = useGlobalContext();

    // LOCAL
    const [nav, setNav] = useState(false);
    return (
        <>
            <div className='container-small-navbar'>
                {/* IMAGE DIV */}
                <Link to={'/'}>
                    <div>
                        <div className='small-logo-img'>
                            <img src={logo} alt="gold-aid" />
                        </div>
                    </div>
                </Link>

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
                    <div className='small-navbar-profile-picture'>
                        <img src={profile} alt="gold-aid-profile-image" />
                    </div>


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
            <div className='small-navbar-sidebar'>
                <div className={nav ? 'small-navbar-menu-show' : 'small-navbar-menu-hidden'}>
                    <div className={nav ? 'small-navbar-menu-box-show' : 'small-navbar-menu-box-hidden'}>
                        <div
                            onClick={() => setNav(false)}
                            className='small-navbar-menu-icon'
                        >
                            <AiOutlineClose className='small-navbar-menu-close' fontSize={30} />
                        </div>
                        <div className='small-navbar-menu-container-img'>
                            <div className='small-navbar-menu-img'>
                                <img src={profile} alt="profile-picture" />
                            </div>
                        </div>
                        <div className='small-navbar-menu-text'>
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

export default SmallNavbar
