import React, { useState } from 'react';
import axios from "axios";
import { useGlobalContext } from '../context/context';
import Inputs, { Eye } from '../Data/Inputs';
import { Link, useNavigate, useLocation } from 'react-router-dom';
const LOGIN_URL = '/login';

const Login_Inputs = () => {
    const { user, setUser, languageBoolean, open, setOpen } = useGlobalContext();
    const { ru, eng } = languageBoolean;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://gold-aid.onrender.com/api/v1/login',
                JSON.stringify({ email: email, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            console.log(response);
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const isAdmin = response?.data?.user?.isAdmin;
            setUser({ email, password, isAdmin, accessToken });
            setEmail('');
            setPassword('');
            navigate('/');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Username or Password is not correct');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
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
