import React from 'react';
import "../css/VideosCSS/motivationText.css"
import { useGlobalContext } from '../context/context';

const LessonTitle = () => {
    const { bgColor, singleLesson } = useGlobalContext();
    const { title, description } = singleLesson
    return (
        <>
            <div className='files-title'>
                <h1 className={bgColor ? 'white' : 'black'}>{title}</h1>
            </div>
            <div className='motivation-text'>
                <p className={bgColor ? 'white' : 'black'}>{description}</p>
            </div>
        </>
    )
}

export default LessonTitle
