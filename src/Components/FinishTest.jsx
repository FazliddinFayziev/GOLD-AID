import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import Inputs from '../Data/Inputs';

function FinishTest({ score, level }) {
    const { name, languageBoolean, ContinueButton, setIsDone } = useGlobalContext();
    const { ru, eng } = languageBoolean;
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDone(true)
        navigate("/")
        ContinueButton();
    }
    return (
        <div className="finish-test">
            <div className="">
                <div className=''>
                    <h1 className=''><p>Thank you {name}</p></h1>
                </div>
                <p>{Inputs(eng, ru).YourScore} <span className=''>{score}</span></p>
                <p>{Inputs(eng, ru).YourLevel}  <span className=''>{level}</span></p>
                <div className='button-container-for-test'>
                    <div className='test-button-container'>
                        <button
                            type='submit'
                            className="test-button"
                            onClick={handleSubmit}
                        >
                            {Inputs(eng, ru).ContinueButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinishTest;
