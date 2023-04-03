import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useGlobalContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
import { Courses, HerroBanner, Loading, Navbar } from '../Components';
import "../HomeCSS/home.css"
// import jwt_decode from 'jwt-decode';

const Home = () => {
    const { bgColor, user, setUser, isLoading, setIsLoading } = useGlobalContext();
    const navigate = useNavigate();

    // GET NEW TOKEN
    // const getNewToken = async () => {
    //     try {
    //         const token = localStorage.getItem('refreshToken')
    //         const res = await axios.post('/', { refreshToken: token }, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         const { accessToken, refreshToken } = res.data
    //         setUser({ accessToken })
    //         localStorage.setItem('refreshToken', refreshToken)
    //         return accessToken
    //     } catch (err) {
    //         logOut()
    //     }
    // }

    // LOG-OUT
    // const logOut = () => {
    //     setUser({})
    //     localStorage.setItem('refreshToken', '')
    //     return navigate('/register')
    // }

    // useEffect(() => {
    //     setIsLoading(true)
    //     const fetch = async () => {
    //         const token = await getNewToken()
    //         if (!token) return navigate('/register')
    //         console.log('Hello World')
    //     }
    //     fetch()
    //     setIsLoading(false)
    // }, [])


    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         getNewToken()
    //     }, 5400000) // fetches new urls and tokens after 1.5 hour
    //     return () => clearInterval(timer)
    // }, [])


    // if (!isLoading) {
    //     return <Loading />
    // }
    return (
        <>
            <div className={bgColor ? 'home-container-white' : 'home-container-black'}>
                <div>
                    <Navbar />
                </div>
                <div>
                    <HerroBanner />
                </div>
                <div>
                    <Courses />
                </div>
            </div>
        </>
    )
}

export default Home
