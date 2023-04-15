import React from 'react';
import '../css/VideosCSS/videoLanguage.css'
import { useGlobalContext } from '../context/context';

const VideoLanguage = () => {
    const { bgColor } = useGlobalContext();
    return (
        <>
            <div className='video-language-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Language</h1>
            </div>
            <div className='video-language-select'>
                <select name="" id="">
                    <option value="uzbek">Uzbek</option>
                    <option value="russian">Russian</option>
                </select>
            </div>
        </>
    )
}

export default VideoLanguage
