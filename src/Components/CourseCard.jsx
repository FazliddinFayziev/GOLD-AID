import React from 'react'
import { logo } from '../assets'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({ id, ieltsPicture, coursePicture, name, }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`user/${name.toLowerCase()}`)
    }
    return (
        <div onClick={handleNavigate} key={id} className='card-level-box'>
            <div className='cardImg-box'>
                <img src={name === "IELTS" ? ieltsPicture : coursePicture} alt="card-image" />
            </div>
            <div className='course-name-container'>
                <p className='course-name'>{name}</p>
            </div>
            <div className='course-image-container'>
                <div className='course-for-img'>
                    <img src={logo} alt="logo" />
                </div>
                {/* <p className='course-name'>{name}</p> */}
            </div>
        </div>
    )
}

export default CourseCard
