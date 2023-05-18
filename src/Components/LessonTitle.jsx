import React from 'react';
import "../css/VideosCSS/motivationText.css"
import { useGlobalContext } from '../context/context';




const LessonTitle = () => {
    const { bgColor, singleLesson, setVideoLanguage, videoLanguage } = useGlobalContext();
    const { title, description } = singleLesson
    return (
        <>
            <div className='lesson-video-container'>
                <div className='lesson-video-title'>
                    {/* TITLE */}
                    <p className='video-text'>• Title:</p>
                    <h4 className='lesson-video-title-text'>{title}</h4>
                    {/* DESCRIPTION */}
                    <p className='video-text'>• Description:</p>
                    <p className='video-text-desc'>{description}</p>
                    {/* LANGUAGE */}
                    <p className='video-text'>• Current Language:</p>
                    <p className='video-text-desc'>{videoLanguage.toUpperCase()}</p>
                    {/* LANGUAGE */}
                    <p className='video-text'>• Change Language:</p>
                    <div className='video-language-select'>
                        <select onChange={(e) => setVideoLanguage(e.target.value)}>
                            <option value="uzbek">Uzbek</option>
                            <option value="russian">Russian</option>
                            <option value="english">English</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LessonTitle
