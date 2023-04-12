import React from 'react'

const LessonCard = ({ id, lessonCard, tick }) => {
    return (
        <>
            <div key={id} className='lesson-card-box'>
                <div className='lesson-card-hover'>
                    <div className='check-lesson-container'>
                        <input checked={tick ? true : false} className={tick ? 'check-lesson' : 'check-lesson-empty'} type="checkbox" />
                    </div>
                    <div className='lesson-cardImg-box'>
                        <img src={lessonCard} alt="card-image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LessonCard
