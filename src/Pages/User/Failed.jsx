import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TfiFaceSad } from "react-icons/tfi";


const Failed = () => {
    const { level } = useParams();
    return (
        <div className="failed-found">
            <div className="failed-container">
                <h1 className="failed-heading"><TfiFaceSad /></h1>
                <p className="failed-subheading">You <span className='failed'>Failed</span>. Please Try again</p>
                <Link to={`/user/${level}`}>
                    <button type='button' className="failed-button">Back to Lessons</button>
                </Link>
            </div>
        </div>
    )
}

export default Failed
