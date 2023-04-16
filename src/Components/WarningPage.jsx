import React from 'react';
import Inputs from '../Data/Inputs';
import { warning_img } from '../assets';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';

const WarningPage = () => {

    // GLOBAL
    const { languageBoolean, isRegister } = useGlobalContext();
    const { ru, eng } = languageBoolean

    // LOCAL
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
