import React from 'react';
import { logo } from '../assets';
import { useNavigate } from 'react-router-dom';
import { AiFillLock } from 'react-icons/ai';
import { useGlobalContext } from '../context/context';

const CourseCard = ({ id, ieltsPicture, coursePicture, name, minScore }) => {
    const { userProfile } = useGlobalContext();
    const { _id, email, profilePicture, progressScore, completedCourses, course } = userProfile
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
            {progressScore >= minScore ?
                (
                    ""
                ) : (
                    <div className='lock-cover'>
                        <div className='lock'>
                            <AiFillLock fontSize={50} />
                        </div>
                    </div >
                )
            }
        </div>
    )
}

export default CourseCard
