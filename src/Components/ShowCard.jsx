import React from 'react'
import { useGlobalContext } from '../context/context'

const ShowCard = ({ handleClose }) => {
    const { errMsg, showCard } = useGlobalContext();
    return (
        <div className={`warning-card ${showCard ? 'show-card' : ''}`}>
            <div className="content">
                <p>{errMsg}</p>
                <button onClick={handleClose}>ok</button>
            </div>
        </div>
    )
}

export default ShowCard
