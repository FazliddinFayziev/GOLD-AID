import React from 'react';
import { black_background_image, white_background_image } from '../assets';
import { useGlobalContext } from '../context/context';
import "../HomeCSS/banner.css";

const HerroBanner = () => {
    const { bgColor } = useGlobalContext();
    return (
        <div className='home-banner'>
            <div className='home-cover'></div>
            <div className='home-banner-img'>
                <img src={bgColor ? white_background_image : black_background_image} alt="banner-image" />
            </div>
            <p>If you woke up without a goal, go back to sleep</p>
        </div>
    )
}

export default HerroBanner
