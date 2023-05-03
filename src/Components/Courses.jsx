import React from 'react';
import '../css/HomeCSS/courses.css';
import CourseCard from './CourseCard';
import { levelCards } from '../Data/data';
import { useGlobalContext } from '../context/context';


const Courses = () => {
    const { bgColor, courses, userProfile } = useGlobalContext();
    const { _id, email, profilePicture, progressScore, completedCourses, course } = userProfile
    return (
        <>
            <div className='courses-container'>
                <div className='course-profile-title'>
                    <h1 className={bgColor ? 'white' : 'black'}>Welcome <span className='course-page-profile-related'>Fazliddin</span>, Your Course is <span className='course-page-profile-related'>{course}</span></h1>
                </div>
                <div className='courses-title'>
                    <h1 className={bgColor ? 'white' : 'black'}>Courses</h1>
                </div>
                <div className='courses-cards'>
                    {
                        courses.map((levelCard, index) => {
                            return (
                                <CourseCard key={index} {...levelCard} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Courses
