import React from 'react';
import '../HomeCSS/courses.css';
import { useGlobalContext } from '../context/context';
import { levelCards } from '../Data/data';
import CourseCard from './CourseCard';



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
                        levelCards.map((levelCard) => {
                            return (
                                <CourseCard {...levelCard} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Courses
