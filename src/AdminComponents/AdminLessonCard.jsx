import React from 'react'
import { Link } from 'react-router-dom';

const AdminLessonCard = ({ lessonPicture, title, lessonId, index }) => {
    return (
        <>
            <Link to={`${lessonId}`}>
                <div key={lessonId} className='lesson-card-box-admin'>
                    <div className='lesson-card-hover-admin'>
                        <div className='lesson-cardImg-box-admin'>
                            <img src={lessonPicture} alt="card-image"
                            />
                        </div>
                        <div className='lesson-name-container-admin'>
                            <p className='lesson-name-admin'>Lesson_{index + 1}</p>
                        </div>
                        <div className='lesson-title-container-admin'>
                            <p className='lesson-title-admin'>{title.slice(0, 10)} . . .</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default AdminLessonCard