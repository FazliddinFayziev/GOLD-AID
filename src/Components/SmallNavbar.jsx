import React from 'react'

const SmallNavbar = () => {
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
                            <div className='navbar-menu-img'>
                                <img src={profile} alt="profile-picture" />
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

export default SmallNavbar
