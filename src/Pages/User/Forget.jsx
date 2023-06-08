import React from 'react'
import { RegisterNavbar, ShowCard, ForgetPassword } from "../../Components";
import { useGlobalContext } from '../../context/context';
import { login_img } from '../../assets';

const Forget = () => {
    const { errMsg } = useGlobalContext();

    return (
        <>
            <ShowCard message={errMsg} />
            <div className="main-container">
                <div className="part-one">
                    <RegisterNavbar />
                    <ForgetPassword />
                </div>

                <div className="part-two">
                    <img src={login_img} alt="gold-aid-register" />
                    <div className="cover"></div>
                </div>

            </div>
        </>
    )
}

export default Forget
