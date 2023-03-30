import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import Inputs from '../Data/Inputs';
import axios from 'axios';
function FinishTest({ score, level }) {
    const { name, email, age, gender, password, backendScore, backendLevel, languageBoolean, ContinueButton, setIsDone } = useGlobalContext();
    const { ru, eng } = languageBoolean;
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDone(true)
        navigate("/")
        ContinueButton();
        axios.post('http://10.10.193.118:3001/api/v1/register', {
            name: name,
            email: email,
            age: age,
            gender: gender,
            password: password,
            level: backendLevel,
            score: backendScore
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
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
