import React from 'react'
import { choose_illustration } from '../assets'


const ChoosePage = () => {
    return (
        <div className="not-allowed-container">
            <h2>Welcome Admin</h2>
            <img
                className="not-allowed-image"
                src={choose_illustration}
                alt="Not Allowed Illustration"
            />
            <p>
                Hi <span className='admin-span'>Admin</span>, Please choose Page
            </p>
            <br />
            <div className='choose-page'>
                <a href="/admin" className="choose-button">Admin Page</a>
                <a href="/" className="choose-button">User Page</a>
            </div>
        </div>
    )
}

export default ChoosePage
