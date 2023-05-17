import React, { useState } from 'react';
import '../css/AdminCSS/pieChart.css';

const PieChart = () => {
    const [maleCount, setMaleCount] = useState(50);
    const [femaleCount, setFemaleCount] = useState(50);

    const calculatePercentage = (count) => {
        const total = maleCount + femaleCount;
        return ((count / total) * 100).toFixed(2);
    };

    const increaseCount = (gender) => {
        if (gender === 'male') {
            setMaleCount(maleCount + 1);
        } else if (gender === 'female') {
            setFemaleCount(femaleCount + 1);
        }
    };

    const decreaseCount = (gender) => {
        if (gender === 'male' && maleCount > 0) {
            setMaleCount(maleCount - 1);
        } else if (gender === 'female' && femaleCount > 0) {
            setFemaleCount(femaleCount - 1);
        }
    };

    return (
        <div className="pie-chart-container">
            <div className="chart">
                <div
                    className="slice"
                    style={{
                        transform: `rotate(${calculatePercentage(femaleCount) * -3.6}deg)`,
                        backgroundColor: '#0080ff',
                    }}
                ></div>
                <div
                    className="slice"
                    style={{
                        transform: `rotate(${calculatePercentage(maleCount) * -3.6}deg)`,
                        backgroundColor: '#ff0080',
                    }}
                ></div>
            </div>
            <div className="legend">
                <div className="legend-item">
                    <div className="color" style={{ backgroundColor: '#0080ff' }}></div>
                    <span>Male: {maleCount}</span>
                </div>
                <div className="legend-item">
                    <div className="color" style={{ backgroundColor: '#ff0080' }}></div>
                    <span>Female: {femaleCount}</span>
                </div>
            </div>
        </div>
    );
};

export default PieChart;
