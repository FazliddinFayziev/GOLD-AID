import React, { useState } from 'react'
import { logo } from '../assets';
import { useGlobalContext } from '../context/context';
import { Link, useNavigate } from 'react-router-dom';


const LessonCard = ({ index, lessonId, title, lessonPicture, isCompleted, currentScore, length }) => {
    const { setLessonTitle, setShowCardLessons } = useGlobalContext();
    return (
        <>
            <Link to={`${lessonId}`}>
                <div key={lessonId} className='lesson-card-box'>
                    <div className='lesson-card-hover'>
                        <div className='check-lesson-container'>
                            <input defaultChecked={isCompleted} className={isCompleted ? 'check-lesson' : 'check-lesson-empty'} type="checkbox" />
                        </div>
                        <div className='lesson-cardImg-box'>
                            <img src={lessonPicture} alt="card-image" />
                        </div>
                        <div className='lesson-name-container'>
                            <p className='lesson-name'>Lesson_{index + 1}</p>
                        </div>
                        <div className='lesson-image-container'>
                            <div className='lesson-for-img'>
                                <img src={logo} alt="logo" />
                            </div>
                        </div>
                        <div className='lesson-button-container'>
                            <button className='title-button-name' onClick={() => {
                                setLessonTitle(title)
                                setShowCardLessons(true)
                            }}>title</button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default LessonCard
