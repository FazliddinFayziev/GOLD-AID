import React from 'react'
import { profilePuctures } from '../Data/data'

const ProfilePictures = () => {
    return (
        <>
            <div className='profile-pictures'>
                <h1>Profile picture:</h1>
            </div>
            <div className='profile-pictures-container'>
                <div>
                    {
                        profilePuctures.map((profile) => {
                            const { id, img, active } = profile
                            return (
                                <div className='pr-img-con' key={id}>
                                    <div className={active ? "pr-img-active" : 'pr-img'}>
                                        <img src={img} alt="profile-images" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ProfilePictures
