import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import Inputs from '../Data/Inputs';
import axios from 'axios';
function FinishTest({ score, level }) {
    const { name, email, age, gender, password, backendScore, backendLevel, languageBoolean, ContinueButton } = useGlobalContext();
    const { ru, eng } = languageBoolean;
    const [err, setErr] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('https://gold-aid.onrender.com/api/v1/register', {
                name: name,
                email: email,
                age: age,
                gender: gender,
                password: password,
                level: backendLevel,
                score: backendScore
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.data)
            ContinueButton();
            return navigate('/')
        } catch (err) {
            console.log(err.response.data.err)
            setErr(err.response.data.err)
        }
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
            <p>{err}</p>
        </div>
    );
}

export default FinishTest;
