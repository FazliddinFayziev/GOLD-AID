import React from 'react'
import "../../css/ProfileCSS/profile.css"
import ProfileBanner from '../../Components/ProfileBanner'
import ProfilePictures from '../../Components/ProfilePictures'
import EditUser from '../../Components/EditUser'
import Footer from '../../Components/Footer';


const Profile = () => {
    return (
        <div>
            <ProfileBanner />
            <br />
            <hr />
            <br />
            <ProfilePictures />
            <br />
            <hr />
            <br />
            <EditUser />
            <Footer />
        </div>
    )
}

export default Profile
