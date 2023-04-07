import React from 'react';
import "../LessonsCSS/progress.css";
import { useGlobalContext } from '../context/context';


const ProgressBar = ({ value, maxValue }) => {
    const percentage = Math.floor((value / maxValue) * 100);
    const { bgColor } = useGlobalContext();
    return (
        <>
            <div className='progress-container'>
                <div className="ProgressBar">
                    <div className="ProgressBar__fill" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
            <div className='progress-text'>
                <h2 className={bgColor ? 'white' : 'black'}>{percentage}%</h2>
            </div>
        </>
    );
}

export default ProgressBar
