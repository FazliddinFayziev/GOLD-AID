import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ age, course, email, gender, isActive, name, profilePicture, _id }) => {
    return (
        <>
            {/* USER CARD */}
            <Link to={`/admin/users/${_id}`} className='user-card'>
                <div className={isActive ? 'active-user' : 'non-active-user'}></div>
                <div className='user-card-img'>
                    <img src={profilePicture} alt="user-card-image" />
                </div>
                <div className='user-card-title'>
                    <div className='user-card-title-container'>
                        <h3>{name}</h3>
                        <p className='user-content'>Email: <span className='gray-span'>{email.slice(0, 10)} . . .</span> </p>
                        <p className='user-content'>Gender: <span className='gray-span'>{gender}</span></p>
                        <p className='user-content'>Level: <span className='gray-span'>{course}</span></p>
                        <p className='user-content'>Age: <span className='gray-span'>{age}</span></p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default UserCard