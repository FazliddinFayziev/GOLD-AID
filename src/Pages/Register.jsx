import React from 'react'
import { RegisterNavbar, Register_Inputs } from "../Components"
import { register_img } from "../assets";

const Register = () => {
    return (
        <div className="main-container">
            <div className="part-one">
                <RegisterNavbar />
                <Register_Inputs />
            </div>

            <div className="part-two">
                <img src={register_img} alt="gold-aid-register" />
                <div className="cover"></div>
            </div>

        </div>
    );
}

export default Register
