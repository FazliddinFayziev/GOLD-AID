import React from 'react';
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlinePlayLesson } from "react-icons/md";
import { BsFillBarChartFill } from "react-icons/bs";

const DashboardCard = () => {
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
                        <p>20 000</p>
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
                        <p>6</p>
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
                        <p>600</p>
                    </div>
                </div>
            </div>
        </>


    );
};

export default DashboardCard;
