import React from 'react'
import { useGlobalContext } from '../context/context'

const ShowCard = ({ message }) => {
    const { showCard } = useGlobalContext()

    return (
        <div className='notification-card'>
            <div className={`notification ${showCard ? 'show' : ''}`}>
                {message}
            </div>
        </div>
    );
}

export default ShowCard
