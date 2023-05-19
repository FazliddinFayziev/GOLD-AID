import React from 'react';
import '../css/AdminCSS/dashboard.css';
import DashboardCard from './DashboardCard';
import { PieChart } from './PieChart';
import BarChart from './BarChart';

const Dashboard = () => {
    return (
        <>
            <div className='dashboard'>

                <div className='start-dashboard'>
                    Dashboard
                </div>

                {/* Working with Dashboard Crads */}
                < div className='dashboard-cards-container'>
                    <div className='dashboard-cards'>
                        <DashboardCard />
                    </div>
                </div>

                {/* Working with Charts */}
                <div className='charts-container'>
                    <div className='pie-chart-width-admin'>
                        <div className='gender-statistics'>
                            <p>Gender Statistics</p>
                        </div>
                        <PieChart />
                    </div>
                    <div className='bar-chart-width-admin'>
                        <div className='gender-statistics'>
                            <p>Users' activity</p>
                        </div>
                        <BarChart />
                    </div>
                </div>
            </div >
        </>
    )
}

export default Dashboard
