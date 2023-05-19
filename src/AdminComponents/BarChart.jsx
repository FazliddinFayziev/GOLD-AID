import React from 'react';
import '../css/AdminCSS/barchart.css';
import { useGlobalContext } from '../context/context';

const BarChart = () => {
    const { getDashInfo } = useGlobalContext();
    const { activeUsers, totalUsers } = getDashInfo
    const data = [
        { range: 'Non-Active Users', count: totalUsers - activeUsers },
        { range: 'Active Users', count: activeUsers },
    ];

    const maxCount = Math.max(...data.map(item => item.count));


    return (
        <div className="chart-container">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="bar"
                    style={{
                        height: `${(item.count / maxCount) * 100}%`,
                        backgroundColor: getBarColor(index),
                    }}
                >
                    <div className="label-bar">{item.range} ({item.count})</div>
                </div>
            ))}
        </div>
    );
};

const getBarColor = index => {
    const colors = ['rgba(255, 0, 0, 0.2)', 'rgba(0, 255, 51, 0.2)'];
    return colors[index % colors.length];
};

export default BarChart;
