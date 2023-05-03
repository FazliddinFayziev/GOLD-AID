import React from 'react'

const CourseCard = ({ id, level, cardImg, coursePicture, name, }) => {
    return (
        <div key={id} className='card-level-box'>
            <div className='cardImg-box'>
                <img src={coursePicture} alt="card-image" />
            </div>
            <div className='course-name-container'>
                <p className='course-name'>{name}</p>
            </div>
        </div>
    )
}

export default CourseCard
