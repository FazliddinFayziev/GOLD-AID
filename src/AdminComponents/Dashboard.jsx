import React from 'react';
import '../css/AdminCSS/dashboard.css';
import DashboardCard from './DashboardCard';
import PieChart from './PieChart';

const Dashboard = () => {
    return (
        <>
            <div className='dashboard'>
                <div className='start-dashboard'>
                    Dashboard
                </div>
                <div className='dashboard-cards-container'>
                    <div className='dashboard-cards'>
                        <DashboardCard />
                    </div>
                </div>
                <PieChart />
            </div>
        </>
    )
}

export default Dashboard
