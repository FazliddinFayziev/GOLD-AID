import React from 'react';
import '../css/AdminCSS/dashboard.css';
import Menu from './Menu';

const Dashboard = () => {
    return (
        <>
            <div className='dashboard'>
                <Menu />
                <div className='start-dashboard'>
                    Dashboard
                </div>
            </div>
        </>
    )
}

export default Dashboard
