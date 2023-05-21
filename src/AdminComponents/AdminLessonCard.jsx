import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { level_default_ielts } from '../assets';

const AdminLessonCard = ({ lessonPicture, title, lessonId, index }) => {
    const { courseName } = useParams();
    return (
        <>
            <Link to={``}>
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