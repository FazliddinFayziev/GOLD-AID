import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ImHappy2 } from "react-icons/im";
import { runFireworks } from '../../assets/utils';

const Already = () => {
    const { level } = useParams();
    useEffect(() => {
        runFireworks();
    }, [])
    return (
        <div className="passed-again-found">
            <div className="passed-again-container">
                <h1 className="passed-again-heading"><ImHappy2 /></h1>
                <p className="passed-again-subheading">You <span className='passed-again'>Passed</span>  Again.</p>
                <Link to={`/user/${level}`}>
                    <button type='button' className="passed-again-button">Back to Lessons</button>
                </Link>
            </div>
        </div>
    )
}

export default Already
