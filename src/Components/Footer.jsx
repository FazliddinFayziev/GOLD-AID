import React from 'react';
import '../HomeCSS/footer.css';
import { logo } from '../assets/index';
import { FaFacebook, FaTelegram, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="social-icons">
                <a href="#">
                    <FaFacebook className="icon" />
                </a>
                <a href="#">
                    <FaTelegram className="icon" />
                </a>
                <a href="#">
                    <FaInstagram className="icon" />
                </a>
            </div>
            <div className='copyright'>
                <p>Copyright © all rights are preserved</p>
            </div>
        </footer>
    )
}

export default Footer
