import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Courses, Footer, HerroBanner, Loading, Navbar } from '../Components';
import { useGlobalContext } from '../context/context';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import '../HomeCSS/home.css';

const Home = () => {
    const { bgColor, user, setUser, setIsLoading } = useGlobalContext();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <div className={bgColor ? 'home-container-white' : 'home-container-black'}>
                <Navbar />
                <HerroBanner />
                <Courses />
                <Footer />
            </div>
        </>
    );
};

export default Home;
