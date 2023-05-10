import React from 'react';
import "../../css/HomeCSS/error.css"
import { offline } from '../../assets';

const Offline = () => {
    return (
        <div className="not-allowed-container">
            <img
                className="not-allowed-image"
                src={offline}
                alt="Not Allowed Illustration"
            />
            <p className="not-allowed-text">
                <span className='not-allowed-user'>
                    Your Are Offline
                </span>
                <br />
                <span className='not-allowed-user'>Try:</span>
                <br />
                • Don't panic
                <br />
                • Look around
                <br />
                • Interact with reality
            </p>
        </div>
    )
}

export default Offline
