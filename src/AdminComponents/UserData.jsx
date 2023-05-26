import React, { useState } from 'react'
import SearchInput from './SearchInput'
import { useGlobalContext } from '../context/context'
import UserCard from './UserCard';
import { AiOutlinePlus } from "react-icons/ai";
import { SiMariadbfoundation } from "react-icons/si";

const UserData = ({ isLoading, setRefetch, refetch, setUsersLimit, setIsLoading }) => {

    const { userInfo } = useGlobalContext();
    const [addTrue, setAddTrue] = useState(true);

    const handleMoreUsers = () => {
        setUsersLimit((prevState) => ({
            lim: prevState.lim + 10, // Add 10 Users to the previous value of lim
            skip: 0,
        }))
        setIsLoading(true)
        setRefetch(!refetch)
    }

    return (
        <>
            <div className='search-container'>
                <SearchInput setIsLoading={setIsLoading} setAddTrue={setAddTrue} setRefetch={setRefetch} refetch={refetch} />
            </div>
            {
                isLoading ? (
                    <div className='loading-users'>
                        <div className="loading-circle-user"></div>
                    </div>
                ) : (
                    <div className='users-container'>
                        {userInfo.length !== 0 ? (

                            <div className='users-cards-container'>
                                {
                                    userInfo.map((info) => {
                                        return <UserCard key={info._id} {...info} />
                                    })
                                }
                            </div>
                        ) : (
                            <div className='no-users'>
                                <div>
                                    <div className='no-user-icon'>
                                        <SiMariadbfoundation color='white' fontSize={100} />
                                    </div>
                                    <p>There is no such user</p>
                                </div>
                            </div>
                        )}
                        {
                            addTrue && (
                                <div className='more-users-container'>
                                    <div onClick={handleMoreUsers} className='more-users'>
                                        <AiOutlinePlus fontSize={30} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default UserData