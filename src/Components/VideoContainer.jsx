import React from 'react';
import { Player, BigPlayButton } from 'video-react';

const VideoContainer = ({ src }) => {
    return (
        <div className="video-container">
            <Player className="main-video" src={src}>
                <BigPlayButton className='big-play-button' position="center" />
            </Player>
        </div>
    );
}

export default VideoContainer
