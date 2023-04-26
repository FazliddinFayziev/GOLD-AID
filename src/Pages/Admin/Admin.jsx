import React from 'react';
import { AddLesson, AdminLevels, AdminVideos, Dashboard, Documents, Menu, Settings, SideBar, Users } from '../../AdminComponents'
import { useGlobalContext } from '../../context/context'
import { DashboardTypes } from '../../context/DashboardPathNames';

const Admin = () => {
    const { dashboardElement } = useGlobalContext();
    return (
        <>
            <SideBar />
            <Menu />
            {dashboardElement === DashboardTypes.DASHBOARD ? (
                <Dashboard />
            ) : dashboardElement === DashboardTypes.LEVELS ? (
                <AdminLevels />
            ) : dashboardElement === DashboardTypes.ADDLESSON ? (
                <AddLesson />
            ) : dashboardElement === DashboardTypes.USERS ? (
                <Users />
            ) : dashboardElement === DashboardTypes.DOCUMENTS ? (
                <Documents />
            ) : dashboardElement === DashboardTypes.VIDEOS ? (
                <AdminVideos />
            ) : (
                <Settings />
            )}
        </>
    )
}

export default Admin
