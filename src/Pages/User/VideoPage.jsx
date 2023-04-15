import React from 'react'
import { BeforeHomework, CommentSection, Files, Footer, LessonTitle, SmallNavbar, Video, VideoLanguage } from '../../Components'
import { useGlobalContext } from '../../context/context'
import "../../css/VideosCSS/videoPage.css"

const VideoPage = () => {
    const { bgColor } = useGlobalContext();
    return (
        <>
            <div className={bgColor ? 'video-container-white' : 'video-container-black'}>
                <SmallNavbar />
                <LessonTitle />
                <VideoLanguage />
                <Video />
                <Files />
                <BeforeHomework />
                <CommentSection />
                <Footer />
            </div>
        </>
    )
}

export default VideoPage
