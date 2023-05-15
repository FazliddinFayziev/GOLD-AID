import React, { useEffect } from 'react'
import { runFireworks } from '../../assets/utils';
import { Link, useParams } from 'react-router-dom';
import { RiEmotionHappyLine } from "react-icons/ri";

const Passed = () => {
    const { level } = useParams();
    useEffect(() => {
        runFireworks();
    }, [])
    return (
        <div className="passed-again-found">
            <div className="passed-again-container">
                <h1 className="passed-heading"><RiEmotionHappyLine /></h1>
                <p className="passed-again-subheading">You <span className='passed-again'>Passed</span>. Congrats!!!</p>
                <Link to={`/user/${level}`}>
                    <button type='button' className="passed-again-button">Back to Lessons</button>
                </Link>
            </div>
        </div>
    )
}

export default Passed
