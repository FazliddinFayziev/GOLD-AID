import React, { useState } from 'react'
import { logo } from '../assets'

const LessonCard = ({ index, lessonId, title, lessonPicture, isCompleted, currentScore, length }) => {
    // const [num, setNum] = useState(0)
    return (
        <>
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
                </div>
                <p>{length}</p>
            </div>
        </>
    )
}

export default LessonCard
