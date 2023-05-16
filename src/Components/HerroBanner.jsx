import React from 'react';
import "../css/HomeCSS/banner.css";
import { white_background_image } from '../assets';

const HerroBanner = () => {
    return (
        <div className='home-banner'>
            <div className='home-cover'></div>
            <div className='home-banner-img'>
                <img src={white_background_image} alt="banner-image" />
            </div>
            <p>If you woke up without a goal, go back to sleep</p>
        </div>
    )
}

export default HerroBanner
