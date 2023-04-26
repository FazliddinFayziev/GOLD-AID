import React from 'react';
import '../css/AdminCSS/sidebar.css';
import { logo } from '../assets';
import { FaTachometerAlt, FaBookOpen, FaVideo, FaCog, FaFileAlt, FaUser } from 'react-icons/fa';
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from '../context/context';
import { DashboardTypes } from '../context/DashboardPathNames';
const SideBar = () => {
    const { sideBar, setSideBar, setDashboardElement } = useGlobalContext();
    return (
        <div className={sideBar ? "sidebar-open" : "sidebar-close"}>
            <div
                onClick={() => setSideBar(false)}
                className='sidebar-close-btn'>
                <AiOutlineClose fontSize={30} />
            </div>
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="main-menu">
                <h3>Dashboard</h3>
                <ul>
                    <li>
                        <div onClick={() => setDashboardElement(DashboardTypes.DASHBOARD)} className="menu-link">
                            <FaTachometerAlt className="menu-icon" />
                            Dashboard
                        </div>
                    </li>
                    <li>
                        <div onClick={() => setDashboardElement(DashboardTypes.LEVELS)} className="menu-link">
                            <FaBookOpen className="menu-icon" />
                            Levels
                        </div>
                    </li>
                    <li>
                        <div onClick={() => setDashboardElement(DashboardTypes.ADDLESSON)} className="menu-link">
                            <FaFileAlt className="menu-icon" />
                            Add Lesson
                        </div>
                    </li>
                    <li>
                        <div onClick={() => setDashboardElement(DashboardTypes.USERS)} className="menu-link">
                            <FaUser className="menu-icon" />
                            Users
                        </div>
                    </li>
                </ul>
            </div>
            <div className="additional">
                <h3>Additional</h3>
                <ul>
                    <li>
                        <div onClick={() => setDashboardElement(DashboardTypes.DOCUMENTS)} className="menu-link">
                            <FaFileAlt className="menu-icon" />
                            Documents
                        </div>
                    </li>
                    <li>
                        <div onClick={() => setDashboardElement(DashboardTypes.VIDEOS)} className="menu-link">
                            <FaVideo className="menu-icon" />
                            Videos
                        </div>
                    </li>
                </ul>
            </div>
            <div className="options">
                <h3>Options</h3>
                <ul>
                    <li>
                        <div onClick={() => setDashboardElement(DashboardTypes.SETTINGS)} className="menu-link">
                            <FaCog className="menu-icon" />
                            Settings
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar
