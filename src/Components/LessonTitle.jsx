import React from 'react';
import "../css/VideosCSS/motivationText.css"
import { useGlobalContext } from '../context/context';

const LessonTitle = () => {
    const { bgColor } = useGlobalContext();
    return (
        <>
            <div className='files-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Present Simple Tense</h1>
            </div>
            <div className='motivation-text'>
                <p className={bgColor ? 'white' : 'black'}>In this lesson, you will learn how to work with Present simple tense in English Grammar. Choose your language and watch video</p>
            </div>
        </>
    )
}

export default LessonTitle
