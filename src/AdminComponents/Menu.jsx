import React from 'react';
import '../css/AdminCSS/menu.css';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useGlobalContext } from '../context/context';
import { profile } from '../assets';


const Menu = () => {
    const { setSideBar, adminUser, setAdminUser } = useGlobalContext();
    const { name, profilePicture } = adminUser;
    return (
        <div className='menu-admin'>
            <div
                onClick={() => setSideBar(true)}
                className='sidebar-menu-container'>
                <HiMenuAlt2 fontSize={30} />
            </div>
            <div className='admin-page-profile'>
                <div className='admin-profile-picture'>
                    <img
                        src={profilePicture ? profilePicture : profile}
                        alt='admin-profile-image'
                        onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop if the default image also fails to load
                            e.target.src = profile; // Display the default profile image
                        }}
                    />
                </div>
                <div>
                    <p className='admin-title'>Admin</p>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    )
}

export default Menu
