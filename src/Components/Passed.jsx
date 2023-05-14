import React from 'react'
import { passed } from '../assets'

const Passed = () => {
    return (
        <>
            <div className='passed-container'>
                <div>
                    <div className='passed-card-img'>
                        <img src={passed} alt="passed" />
                    </div>
                    <p><span className='congrats'>Congrats!</span> You have passed the test </p>
                </div>
            </div>
        </>
    )
}

export default Passed
