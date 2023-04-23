import React from 'react';
import '../css/AdminCSS/menu.css';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useGlobalContext } from '../context/context';
import { profile } from '../assets';


const Menu = () => {
    const { setSideBar } = useGlobalContext();
    return (
        <div className='menu-admin'>
            <div
                onClick={() => setSideBar(true)}
                className='sidebar-menu-container'>
                <HiMenuAlt2 fontSize={30} />
            </div>
            <div className='admin-page-profile'>
                <div className='admin-profile-picture'>
                    <img src={profile} alt="admin-profile-picture" />
                </div>
                <div>
                    <p className='admin-title'>Admin</p>
                    <p>Fazliddin</p>
                </div>
            </div>
        </div>
    )
}

export default Menu
