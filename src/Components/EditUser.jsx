import React from 'react'

const EditUser = () => {
    return (
        <>
            <div>
                <div className='profile-name'>
                    <h1>User Name:</h1>
                    <h2>Fazliddin</h2>
                </div>
                <div className='profile-name-btn'>
                    <button type='button'>Edit</button>
                </div>
            </div>
            <div>
                <div className='profile-name'>
                    <h1>Email:</h1>
                    <h2>fazrez4515@gmail.com</h2>
                </div>
                <div className='profile-name-btn'>
                    <button type='button'>Edit</button>
                </div>
            </div>
            <div>
                <div className='profile-name'>
                    <h1>Password:</h1>
                    <h2>QwErTy4515@</h2>
                </div>
                <div className='profile-name-btn'>
                    <button type='button'>Edit</button>
                </div>
            </div>
            <br />
            <div className='go-home-profile'>
                <button type="button">Go Home</button>
            </div>
        </>
    )
}

export default EditUser
