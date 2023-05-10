import React from 'react';
import '../css/VideosCSS/videoLanguage.css'
import { useGlobalContext } from '../context/context';

const VideoLanguage = () => {
    const { bgColor, videoLanguage, setVideoLanguage, singleLesson } = useGlobalContext();
    const { lessonId, title, files, videos, lessonPicture, description, course } = singleLesson
    return (
        <>
            <div className='video-language-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Language</h1>
            </div>
            <div className='video-language-select'>
                <select onChange={(e) => setVideoLanguage(e.target.value)}>
                    <option value="uzbek">Uzbek</option>
                    <option value="russian">Russian</option>
                    <option value="english">English</option>
                </select>
            </div>
        </>
    )
}

export default VideoLanguage
