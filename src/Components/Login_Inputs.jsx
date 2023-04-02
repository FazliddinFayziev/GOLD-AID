import React, { useState } from 'react';
import axios from "axios";
import { useGlobalContext } from '../context/context';
import Inputs, { Eye } from '../Data/Inputs';
import { useNavigate } from 'react-router-dom';

const Login_Inputs = () => {
    const { user, setUser, languageBoolean, open, setOpen } = useGlobalContext();
    const { ru, eng } = languageBoolean;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setErr('')
            const { accessToken, refreshToken } = res.data
            localStorage.setItem('refreshToken', refreshToken)
            setUser({ accessToken })
            return navigate('/')
        } catch (err) {
            console.log(err)
            setErr(err.response.data.err)
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

            </div>

        </div>
    )
}

export default Login_Inputs
