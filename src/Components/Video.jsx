import React from 'react'
import "../css/VideosCSS/video.css"
import { video } from "../assets/index"
import 'video-react/dist/video-react.css'
import VideoContainer from './VideoContainer';
import { useGlobalContext } from '../context/context';

const Video = () => {
    const { bgColor, singleLesson } = useGlobalContext();
    const { lessonId, title, files, videos, lessonPicture, description, course } = singleLesson
    return (
        <>
            <div className='video-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Video</h1>
            </div>
            <div className='video-play-container'>
                <VideoContainer src={video} />
            </div>
        </>
    )
}

export default Video
