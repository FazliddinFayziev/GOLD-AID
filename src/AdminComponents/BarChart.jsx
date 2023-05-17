import React from 'react';
import '../css/AdminCSS/barchart.css';

const data = [
    { range: '0-10', count: 8 },
    { range: '10-20', count: 15 },
    { range: '20-30', count: 20 },
    { range: '30+', count: 12 },
];

const BarChart = () => {
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
                    <div className="label-bar">{item.range}</div>
                </div>
            ))}
        </div>
    );
};

const getBarColor = index => {
    const colors = ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)'];
    return colors[index % colors.length];
};

export default BarChart;
