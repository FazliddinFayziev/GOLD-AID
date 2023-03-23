import React from 'react'
import '../css/loading.css'

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-container-2">
                <div className="loader">
                    <div className="loader__bar"></div>
                    <div className="loader__bar"></div>
                    <div className="loader__bar"></div>
                    <div className="loader__bar"></div>
                    <div className="loader__bar"></div>
                    <div className="loader__ball"></div>
                </div>
                <h3>Loading . . .</h3>
            </div>
        </div>
    )
}

export default Loading
