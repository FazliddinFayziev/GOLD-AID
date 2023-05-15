import React from 'react';
import { AiOutlineFileSearch } from "react-icons/ai";
import { Link, useParams } from 'react-router-dom';


const NotHomework = () => {
    const { level } = useParams();
    return (
        <div className="nohomework-found">
            <div className="nohomework-container">
                <h1 className="nohomework-heading"><AiOutlineFileSearch /></h1>
                <p className="nohomework-subheading">No Homework yet</p>
                <Link to={`/user/${level}`}>
                    <button type='button' className="nohomework-button">Back to Lessons</button>
                </Link>
            </div>
        </div>
    )
}

export default NotHomework
