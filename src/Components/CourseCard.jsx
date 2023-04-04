import React from 'react'

const CourseCard = ({ id, cardImg }) => {
    return (
        <div key={id} className='card-level-box'>
            <div className='cardImg-box'>
                <img src={cardImg} alt="card-image" />
            </div>
        </div>
    )
}

export default CourseCard
