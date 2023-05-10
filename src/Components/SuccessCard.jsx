import React from 'react'
import { useGlobalContext } from '../context/context';

const SuccessCard = ({ message }) => {
    const { showSuccessCard } = useGlobalContext()

    return (
        <div className='notification-success-card'>
            <div className={`notification-success ${showSuccessCard ? 'show-success' : ''}`}>
                {message}
            </div>
        </div>
    );
}

export default SuccessCard
