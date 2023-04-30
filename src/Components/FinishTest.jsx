import axios from '../api/axios';
import Inputs from '../Data/Inputs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import { setTokenToLocalStorage } from '../context/Functions';
function FinishTest({ score, level }) {

    // GLOBAL
    const {
        age,
        name,
        email,
        gender,
        setUser,
        password,
        backendLevel,
        backendScore,
        ContinueButton,
        languageBoolean,
    } = useGlobalContext();
    const { ru, eng } = languageBoolean;

    // LOCAL
    const [err, setErr] = useState('')
    const navigate = useNavigate();


    // SUBMITTING MY DATA TO BACKEND
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/register', {
                name: name,
                email: email,
                age: age,
                gender: gender,
                password: password,
                courseName: backendLevel,
                score: backendScore
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res.data)
            const accessToken = res?.data?.accessToken;
            const refreshToken = res?.data?.refreshToken;
            const isAdmin = res?.data?.isAdmin;
            setUser({ email, password, isAdmin, accessToken });
            setTokenToLocalStorage(refreshToken, 30) // Local Storage with TOKENS
            ContinueButton();
            return navigate('/')
        } catch (err) {
            console.log(err.response.data.err)
            setErr(err.response.data.err)
        }
    }


    return (
        <>
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
            <p>{err}</p>
        </>
    );
}

export default FinishTest;
