import React from 'react'
import { Footer, HomeWorkTest, SmallNavbar } from '../../Components';
import { useGlobalContext } from '../../context/context';


const Homework = () => {
    const { bgColor } = useGlobalContext();
    return (
        <>
            <div className={bgColor ? 'homework-test-page-white' : 'homework-test-page-black'}>
                <SmallNavbar />
                <HomeWorkTest />
                <Footer />
            </div>
        </>
    )
}

export default Homework
