import React, { useEffect, useState } from 'react'
import { RegisterNavbar, Login_Inputs, ShowCard } from "../../Components";
import { useGlobalContext } from '../../context/context';
import { randomMidjourney } from '../../Data/data';
import { login_img } from '../../assets';

const Login = () => {
    const { errMsg } = useGlobalContext();
    const [randomPic, setRandomPic] = useState(8);

    useEffect(() => {
        // RANDOM Pictures
        const ReadyrandomPic = Math.floor(Math.random() * randomMidjourney.length);
        setRandomPic(ReadyrandomPic)
    }, [])

    return (
        <>
            <ShowCard message={errMsg} />
            <div className="main-container">
                <div className="part-one">
                    <RegisterNavbar />
                    <Login_Inputs />
                </div>

                <div className="part-two">
                    <img src={login_img} alt="gold-aid-register" />
                    <div className="cover"></div>
                </div>

            </div>
        </>
    )
}

export default Login
