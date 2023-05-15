import React, { useEffect, useState } from 'react'
import "../css/VideosCSS/video.css"
import 'video-react/dist/video-react.css'
import VideoContainer from './VideoContainer';
import { useGlobalContext } from '../context/context';

const Video = () => {
    const { bgColor, singleLesson, isVideo, setIsVideo, videoLanguage, setVideoLanguage } = useGlobalContext();
    const { lessonId, title, files, videos, lessonPicture, description, course } = singleLesson

    const changeVideo = (lng) => {
        if (lng === 'uzbek' && videos && videos.uzbek) {
            setVideoLanguage('uzbek');
            setIsVideo(videos.uzbek);
        } else if (lng === 'russian' && videos && videos.russian) {
            setVideoLanguage('russian');
            setIsVideo(videos.russian);
        } else if (lng === 'english' && videos && videos.english) {
            setVideoLanguage('english');
            setIsVideo(videos.english);
        }
    };

    useEffect(() => {
        changeVideo(videoLanguage)
        console.log(videoLanguage)
    }, [videoLanguage, isVideo])

    return (
        <>
            <div className='video-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Video</h1>
            </div>
            {videos && (
                <div className='video-play-container'>
                    <VideoContainer src={isVideo} />
                </div>
            )
            }
        </>
    );

}

export default Video
