import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { level_default_ielts } from '../assets';

const AdminLessonCard = ({ lessonPicture, title }) => {
    const { courseName } = useParams();
    return (
        <>
            <Link to={``}>
                <div className='card-lesson-box-admin'>
                    <div className='cardImg-lesson-admin'>
                        <img
                            src={lessonPicture ? lessonPicture : level_default_ielts}
                            alt='gold-aid-profile-image'
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop if the default image also fails to load
                                e.target.src = level_default_ielts; // Display the default profile image
                            }}
                        />
                    </div>
                    <div className='lesson-name-container-admin'>
                        <p className='lesson-name-admin'>{title}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default AdminLessonCard