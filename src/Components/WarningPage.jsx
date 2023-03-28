import React from 'react';
import { warning_img } from '../assets';
import { useGlobalContext } from '../context/context';
import Inputs from '../Data/Inputs';
import { useNavigate } from 'react-router-dom';

const WarningPage = () => {
    const { languageBoolean, isRegister } = useGlobalContext();
    const { ru, eng } = languageBoolean

    const navigate = useNavigate();

    const handleNavigate = () => {
        if (isRegister) {
            navigate("/test")
        }
    }

    return (
        <div>
            <div className='warning-text-center'>
                {Inputs(eng, ru).WarningPageTitle}
            </div>
            <div className='warning-text-center'>
                {Inputs(eng, ru).WarningPage}
            </div>
            <div className='warning-img'>
                <div className='warning-img-container'>
                    <img src={warning_img} alt="Gold-Aid-warning-img" />
                </div>
            </div>
            <div className='button-container'>
                <div className='warning-button-container'>
                    <button
                        className='warning-button'
                        onClick={handleNavigate}
                    >
                        {Inputs(eng, ru).StartTest}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WarningPage
