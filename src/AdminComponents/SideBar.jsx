import React from 'react';
import '../css/AdminCSS/sidebar.css';
import { logo } from '../assets';
import { FaTachometerAlt, FaBookOpen, FaVideo, FaCog, FaFileAlt, FaUser } from 'react-icons/fa';
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from '../context/context';
import { DashboardTypes } from '../context/DashboardPathNames';
import { Link, useNavigate } from 'react-router-dom';
const SideBar = () => {
    const { sideBar, setSideBar, setDashboardElement } = useGlobalContext();
    const handleClose = () => {
        setSideBar(false)
    }
    return (
        <div className={sideBar ? "sidebar-open" : "sidebar-close"}>

            <div onClick={handleClose} className='sidebar-close-btn'>
                <AiOutlineClose fontSize={30} />
            </div>

            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="main-menu">
                <h3>Dashboard</h3>
                <ul>
                    <li>

                        <Link className="menu-link" to={'/admin'}>
                            <div onClick={handleClose} className="menu-link">
                                <FaTachometerAlt className="menu-icon" />
                                Dashboard
                            </div>
                        </Link>

                    </li>
                    <li>

                        <Link className="menu-link" to={'/admin/courses'}>
                            <div onClick={handleClose} className="menu-link">
                                <FaBookOpen className="menu-icon" />
                                Courses
                            </div>
                        </Link>

                    </li>
                    <li>

                        <Link className="menu-link" to={'/admin/add-lesson'}>
                            <div onClick={handleClose} className="menu-link">
                                <FaFileAlt className="menu-icon" />
                                Add Lesson
                            </div>
                        </Link>

                    </li>
                    <li>

                        <Link className="menu-link" to={'/admin/users'}>
                            <div onClick={handleClose} className="menu-link">
                                <FaUser className="menu-icon" />
                                Users
                            </div>
                        </Link>

                    </li>
                </ul>
            </div>
            <div className="additional">
                <h3>Additional</h3>
                <ul>
                    <li>

                        <Link className="menu-link" to={'/admin/quotes'}>
                            <div onClick={handleClose} className="menu-link">
                                <FaFileAlt className="menu-icon" />
                                Quotes
                            </div>
                        </Link>

                    </li>
                    <li>

                        <Link className="menu-link" to={'/admin/videos'}>
                            <div onClick={handleClose} className="menu-link">
                                <FaVideo className="menu-icon" />
                                Videos
                            </div>
                        </Link>

                    </li>
                </ul>
            </div>
            <div className="options">
                <h3>Options</h3>
                <ul>
                    <li>

                        <Link className="menu-link" to={'/admin/settings'}>
                            <div onClick={handleClose} className="menu-link">
                                <FaCog className="menu-icon" />
                                Settings
                            </div>
                        </Link>

                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar
