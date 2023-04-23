import React from 'react';
import '../css/AdminCSS/sidebar.css';
import { Link } from 'react-router-dom';
import { logo } from '../assets';
import { FaTachometerAlt, FaBookOpen, FaVideo, FaCog, FaFileAlt, FaUser } from 'react-icons/fa';
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from '../context/context';
const SideBar = () => {
    const { sideBar, setSideBar } = useGlobalContext();
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
                        <Link to="/" className="menu-link">
                            <FaTachometerAlt className="menu-icon" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/levels" className="menu-link">
                            <FaBookOpen className="menu-icon" />
                            Levels
                        </Link>
                    </li>
                    <li>
                        <Link to="/add-lesson" className="menu-link">
                            <FaFileAlt className="menu-icon" />
                            Add Lesson
                        </Link>
                    </li>
                    <li>
                        <Link to="/users" className="menu-link">
                            <FaUser className="menu-icon" />
                            Users
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="additional">
                <h3>Additional</h3>
                <ul>
                    <li>
                        <Link to="/documents" className="menu-link">
                            <FaFileAlt className="menu-icon" />
                            Documents
                        </Link>
                    </li>
                    <li>
                        <Link to="/videos" className="menu-link">
                            <FaVideo className="menu-icon" />
                            Videos
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="options">
                <h3>Options</h3>
                <ul>
                    <li>
                        <Link to="/settings" className="menu-link">
                            <FaCog className="menu-icon" />
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar
