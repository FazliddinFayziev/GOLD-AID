import React from 'react';
import '../css/HomeCSS/courses.css';
import CourseCard from './CourseCard';
import { levelCards } from '../Data/data';
import { useGlobalContext } from '../context/context';


const Courses = () => {
    const { bgColor } = useGlobalContext();
    return (
        <>
            <div className='courses-container'>
                <div className='courses-title'>
                    <h1 className={bgColor ? 'white' : 'black'}>Courses</h1>
                </div>
                <div className='courses-cards'>
                    {
                        levelCards.map((levelCard, index) => {
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
