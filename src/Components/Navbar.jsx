import React, { useState } from 'react'
import '../HomeCSS/navbar.css'
import { hambook, logo, profile } from '../assets'
import { useGlobalContext } from '../context/context'
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs"

const Navbar = () => {
    const { bgColor, setBgColor } = useGlobalContext();
    const { nav, setNav } = useState(false);
    return (
        <>
            <div className='container-home-navbar'>
                {/* IMAGE DIV */}
                <div>
                    <div className='logo-img'>
                        <img src={logo} alt="gold-aid" />
                    </div>
                </div>

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
                    <div className='home-navbar-profile-picture'>
                        <img src={profile} alt="gold-aid-profile-image" />
                    </div>


                    {/* NAVBAR @MEDIA HAMBURGER */}
                    <div className='hambook-container'>
                        <img src={hambook} alt="hambook" />
                    </div>
                </div>
            </div>

            {/* @MEDIA OPEN NAVBAR MENU */}
            <div className='navbar-menu'>

            </div>
        </>
    )
}

export default Navbar
