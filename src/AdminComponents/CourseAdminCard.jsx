import React from 'react'
import { level_default_ielts } from '../assets'
import { Link } from 'react-router-dom';

const CourseAdminCard = ({ name, coursePicture }) => {
    return (
        <>
            <Link to={`/admin/courses/${name.toLowerCase()}`}>
                <div className='card-level-box-admin'>
                    <div className='cardImg-box-admin'>
                        <img
                            src={coursePicture ? coursePicture : level_default_ielts}
                            alt='gold-aid-profile-image'
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop if the default image also fails to load
                                e.target.src = level_default_ielts; // Display the default profile image
                            }}
                        />
                    </div>
                    <div className='course-name-container-admin'>
                        <p className='course-name-admin'>{name}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CourseAdminCard