import React, { useEffect } from 'react'
import "../css/VideosCSS/video.css"
import 'video-react/dist/video-react.css'
import VideoContainer from './VideoContainer';
import { useGlobalContext } from '../context/context';
import "../css/VideosCSS/videoLanguage.css";
import { useParams } from 'react-router-dom';

const Video = () => {
    const { bgColor, singleLesson, isVideo, setIsVideo, videoLanguage, setVideoLanguage } = useGlobalContext();
    const { videos } = singleLesson
    const { level } = useParams();

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
        else {
            setVideoLanguage(videoLanguage);
            setIsVideo(null)
        }
    };

    useEffect(() => {
        changeVideo(videoLanguage)
    }, [videoLanguage, isVideo, videos])

    return (
        <>
            <div className='video-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Video</h1>
            </div>
            {videos && isVideo !== null ? (
                <div className='video-play-container'>
                    <VideoContainer src={isVideo ? isVideo : (!isVideo && level === "beginner" || "elementary" || "pre-intermediate") ? videos.uzbek : (!isVideo && level === "intermediate" || "upper-intermediate" || "ielts") ? videos.english : isVideo} />
                </div>
            ) : (
                <div className={bgColor ? 'no-language-black' : 'no-language-white'}>
                    <div>
                        <p>There is no video in <span className='language'>{videoLanguage.toUpperCase()}</span> language</p>
                        <p className='change-language'>Please, Change Video Language</p>
                    </div>
                </div>
            )
            }
        </>
    );

}

export default Video
