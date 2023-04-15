import React from 'react';
import '../../css/HomeCSS/error.css';

const Error = () => {
    return (
        <div className="page-not-found">
            <div className="error-text-container">
                <h1 className="error-heading">404</h1>
                <p className="error-subheading">Page is not found</p>
                <a href="/" className="error-button">Back to Homepage</a>
            </div>
        </div>
    )
}

export default Error
