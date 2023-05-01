import React from 'react'

const CourseCard = ({ _id, id, level, cardImg, coursePicture, name, }) => {
    return (
        <div key={id} className='card-level-box'>
            <div className='cardImg-box'>
                <img src={cardImg} alt="card-image" />
            </div>
            {/* <p>{name}</p> */}
        </div>
    )
}

export default CourseCard
