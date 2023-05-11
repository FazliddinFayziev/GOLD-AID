import React from 'react';
import '../css/LessonsCSS/lessons.css';
import { AiOutlineSearch } from "react-icons/ai";

const NoLessons = () => {
    return (
        <div className='no-lessons'>
            <div className='no-lessons-search'>
                <AiOutlineSearch fontSize={40} />
            </div>
            <div className="no-lessons-container">
                <p className="no-lessons-text">No lessons yet</p>
            </div>
            <div className='no-lessons-button'>
                <a href="/" className="error-button">Back to Homepage</a>
            </div>
        </div>
    )
}

export default NoLessons
