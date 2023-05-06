import React from 'react'

const LessonCard = ({ lessonId, title, lessonPicture, isCompleted, currentScore }) => {
    return (
        <>
            <div key={lessonId} className='lesson-card-box'>
                <div className='lesson-card-hover'>
                    <div className='check-lesson-container'>
                        <input checked={currentScore ? true : false} className={currentScore ? 'check-lesson' : 'check-lesson-empty'} type="checkbox" />
                    </div>
                    <div className='lesson-cardImg-box'>
                        <img src={lessonPicture} alt="card-image" />
                    </div>
                    <p>{title}</p>
                </div>
            </div>
        </>
    )
}

export default LessonCard
