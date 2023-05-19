import React from 'react'
import SearchInput from './SearchInput'
import { useGlobalContext } from '../context/context'
import UserCard from './UserCard';

const UserData = ({ accessToken }) => {
    const { userInfo } = useGlobalContext();
    return (
        <>
            <div className='search-container'>
                <SearchInput />
            </div>
            {
                !accessToken ? (
                    <div className='loading-users'>
                        <div className="loading-circle-user"></div>
                    </div>
                ) : (
                    <div className='users-container'>
                        <div className='users-cards-container'>
                            {
                                userInfo && userInfo.map((info) => {
                                    return <UserCard key={info._id} {...info} />
                                })
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UserData