import React from 'react';
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlinePlayLesson } from "react-icons/md";
import { BsFillBarChartFill } from "react-icons/bs";
import { useGlobalContext } from '../context/context';

const DashboardCard = () => {
    const { getDashInfo } = useGlobalContext();
    const { courses, lessons, totalUsers } = getDashInfo
    return (
        <>
            <div className='main-dashboard-card-div'>
                <div className='dashboard-number-blue'>
                    <FaUserGraduate fontSize={30} />
                </div>
                <div className="dashboard-card-admin">
                    <div className='dashboard-card-title'>
                        <p>Overall Users</p>
                    </div>
                    <div className='dashboard-card-desc'>
                        <p>{totalUsers}</p>
                    </div>
                </div>
            </div>

            <div className='main-dashboard-card-div'>
                <div className='dashboard-number-green'>
                    <BsFillBarChartFill fontSize={30} />
                </div>
                <div className="dashboard-card-admin">
                    <div className='dashboard-card-title'>
                        <p>Overall Courses</p>
                    </div>
                    <div className='dashboard-card-desc'>
                        <p>{courses}</p>
                    </div>
                </div>
            </div>

            <div className='main-dashboard-card-div'>
                <div className='dashboard-number-red'>
                    <MdOutlinePlayLesson fontSize={30} />
                </div>
                <div className="dashboard-card-admin">
                    <div className='dashboard-card-title'>
                        <p>Overall Lessons</p>
                    </div>
                    <div className='dashboard-card-desc'>
                        <p>{lessons}</p>
                    </div>
                </div>
            </div>
        </>


    );
};

export default DashboardCard;
