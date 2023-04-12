import React from 'react'
import { Footer, HerroBanner, Lessons, Navbar } from '../../Components'
import { useGlobalContext } from '../../context/context'
const LessonsPage = () => {
    const { bgColor } = useGlobalContext();
    return (
        <>
            <div className={bgColor ? 'home-container-white' : 'home-container-black'}>
                <Navbar />
                <HerroBanner />
                <Lessons />
                <Footer />
            </div>
        </>
    )
}

export default LessonsPage
