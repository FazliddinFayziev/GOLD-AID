import React from 'react'
import { useGlobalContext } from '../context/context';
import "../css/VideosCSS/video.css"
import VideoContainer from './VideoContainer';
import { video } from "../assets/index"
import 'video-react/dist/video-react.css'

const Video = () => {
    const { bgColor } = useGlobalContext();
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
