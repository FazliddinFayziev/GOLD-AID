import axios from '../api/axios';
import React, { useState } from 'react';
import CircleLoading from './CircleLoading';
import Inputs, { Eye } from '../Data/Inputs';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import { setTokenToLocalStorage } from '../context/Functions';


const Login_Inputs = () => {

    // GLOBAL
    const {
        open,
        setUser,
        setOpen,
        languageBoolean,
    } = useGlobalContext();
    const { ru, eng } = languageBoolean;

    // LOCAL
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [loginLoading, setLoginLoading] = useState(false)
    const navigate = useNavigate();


    // SUBMITION LOGIC
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginLoading(true)
        try {
            const response = await axios.post('/login',
                JSON.stringify({ email: email, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response);
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            const isAdmin = response?.data?.isAdmin;
            setUser({ email, password, isAdmin, accessToken });
            setTokenToLocalStorage(refreshToken, 30) // Local Storage with TOKENS
            setEmail('');
            setPassword('');
            if (isAdmin) {
                navigate('/admin');
                setLoginLoading(false)
            } else {
                navigate('/')
                setLoginLoading(false)
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                setLoginLoading(false)
            } else if (err.response?.status === 400) {
                setErrMsg('Username or Password is not correct');
                setLoginLoading(false)
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
                setLoginLoading(false)
            } else {
                setErrMsg('Email is not found');
                setLoginLoading(false)
            }
        }
    }

    if (loginLoading) {
        return <CircleLoading />
    }

    return (
        <div className="container-inputs-login">
            <div className="login-inputs">

                {/* TEXT */}

                <h1>{Inputs(eng, ru).Welcome}</h1>

                {/* ALL INPUTS */}

                {/* input-1 */}
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={Inputs(eng, ru).InputEmail}
                    />
                </div>

                {/* input-2 */}
                <div>
                    <input
                        type={Eye(open).type}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={Inputs(eng, ru).InputPassword}
                    />
                    <div onClick={() => setOpen(!open)} className='eye'>
                        {Eye(open).sign}
                    </div>
                </div>

                {/* forget login */}
                <h5>
                    {Inputs(eng, ru).Forgot}
                </h5>

                {/* END OF INPUTS */}

                {/* BUTTON */}

                <div>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className='login-button'>
                        {Inputs(eng, ru).Login}
                    </button>
                </div>

                <p>{errMsg}</p>

            </div>

        </div>
    )
}

export default Login_Inputs
