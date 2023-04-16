import React from 'react'
import "../../css/ProfileCSS/profile.css"
import ProfileBanner from '../../Components/ProfileBanner'
import ProfilePictures from '../../Components/ProfilePictures'


const Profile = () => {
    return (
        <div>
            <ProfileBanner />
            <ProfilePictures />
        </div>
    )
}

export default Profile
