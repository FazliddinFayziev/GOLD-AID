import React from 'react'
import { RegisterNavbar, ShowCard, SetNewPassword } from "../../Components";
import { useGlobalContext } from '../../context/context';
import { login_img } from '../../assets';

const NewPassword = () => {
    const { errMsg } = useGlobalContext();

    return (
        <>
            <ShowCard message={errMsg} />
            <div className="main-container">
                <div className="part-one">
                    <RegisterNavbar />
                    <SetNewPassword />
                </div>

                <div className="part-two">
                    <img src={login_img} alt="gold-aid-register" />
                    <div className="cover"></div>
                </div>

            </div>
        </>
    )
}

export default NewPassword
