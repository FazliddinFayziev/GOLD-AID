import React, { useState } from 'react'
import { lesson_3_default, lesson_4_default, lessons_2_default, lessons_default } from '../assets';
import { useGlobalContext } from '../context/context';
import { Link, useNavigate } from 'react-router-dom';


const LessonCard = ({ index, lessonId, title, lessonPicture, isCompleted, currentScore, length }) => {
    return (
        <>
            <Link to={`${lessonId}`}>
                <div key={lessonId} className='lesson-card-box'>
                    <div className='lesson-card-hover'>
                        <div className='check-lesson-container'>
                            <input defaultChecked={isCompleted} className={isCompleted ? 'check-lesson' : 'check-lesson-empty'} type="checkbox" />
                        </div>
                        <div className='lesson-cardImg-box'>
                            <img
                                src={lessonPicture ? lessonPicture : lessons_default}
                                alt='gold-aid-profile-image'
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop if the default image also fails to load
                                    e.target.src = lessons_default; // Display the default lesson image
                                }}
                            />
                        </div>
                        <div className='lesson-name-container'>
                            <p className='lesson-name'>Lesson_{index + 1}</p>
                        </div>
                        <div className='lesson-title-container'>
                            <p className='lesson-title'>{title.slice(0, 10)} . . .</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default LessonCard
