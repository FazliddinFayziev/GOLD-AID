import React, { useState } from 'react';
import CircleLoading from './CircleLoading';
import Inputs from '../Data/Inputs';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import { AiOutlineSend } from "react-icons/ai";
import axios from '../api/axios';


const ForgetPassword = () => {

    // GLOBAL
    const { languageBoolean, setShowCard, setErrMsg, setMsg } = useGlobalContext();
    const { ru, eng } = languageBoolean;

    // LOCAL
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();


    // SUBMITION LOGIC
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.post('/user/password/recovery',
                JSON.stringify({ email: email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            // console.log(response);
            setMsg(response.data.msg);
            navigate('/goemail');
        } catch (err) {
            if (err.response.data.err === "Email has already been sent to fazrez4515@gmail.com, request another email in 24 hours" && err.response?.status === 400) {
                setErrMsg('Request another email in 24 hours');
                setShowCard(true);
                setIsLoading(false);
            } else if (err.response?.status === 400 || err.response.data.err === "\"email\" must be a valid email" || err.response.data.err === "\"email\" is not allowed to be empty") {
                setErrMsg('Send correct email');
                setShowCard(true);
                setIsLoading(false);
            }
            else if (err.response?.status === 404) {
                setErrMsg('email is not found');
                setShowCard(true);
                setIsLoading(false);
            } else {
                setErrMsg('something went wrong');
                setShowCard(true);
                setIsLoading(false);
            }
        }
    }

    if (isLoading) {
        return <CircleLoading />
    }

    return (
        <div className="container-inputs-login">
            <div className="login-inputs">

                {/* TEXT */}

                <h1>{Inputs(eng, ru).InputEmail}</h1>

                {/* ALL INPUTS */}

                {/* input-1 */}
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={Inputs(eng, ru).InputEmail}
                        autoComplete="new-password"
                    />
                </div>

                {/* END OF INPUTS */}

                {/* BUTTON */}

                <div>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        className='login-button'>

                        Send <AiOutlineSend fontSize={30} style={{ marginLeft: '10px', color: '#fff' }} />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ForgetPassword
