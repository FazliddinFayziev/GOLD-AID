import React from 'react';
import "../css/HomeCSS/error.css";
import { illustration } from '../assets';
import { useGlobalContext } from '../context/context';

const NotAllowedComponent = () => {
    const { bgColor, courses, userProfile } = useGlobalContext();
    const { _id, email, profilePicture, progressScore, completedCourses, course, name } = userProfile
    return (
        <div className="not-allowed-container">
            <img
                className="not-allowed-image"
                src={illustration}
                alt="Not Allowed Illustration"
            />
            <p className="not-allowed-text">
                Dear <span className='not-allowed-user'>{name}</span>, Your level is <span className='not-allowed-user'>{course}</span>, You do not have access to this page
            </p>
            <br />
            <a href="/" className="error-button">Back to Homepage</a>
        </div>
    );
}

export default NotAllowedComponent
