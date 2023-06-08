import React, { useState } from 'react';
import CircleLoading from './CircleLoading';
import Inputs, { Eye } from '../Data/Inputs';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import axios from '../api/axios';


const SetNewPassword = () => {

    // GLOBAL
    const { languageBoolean, setShowCard, setErrMsg, open, setOpen, } = useGlobalContext();
    const { ru, eng } = languageBoolean;

    // LOCAL
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    // USEPARAMs()
    const { passwordToken } = useParams();


    // SUBMITION LOGIC
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.patch('user/password/recovery',
                JSON.stringify({
                    token: passwordToken,
                    newPassword: password
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(response);
            setErrMsg("password is successfully updated");
            setShowCard(true);
            navigate('/login');
        } catch (err) {
            if (err.response?.status === 400 || err.response.data.err === "\"newPassword\" is not allowed to be empty" || err.response.data.err === "\"newPassword\" length must be at least 6 characters long") {
                setErrMsg('Password length must be at least 6 characters long');
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

                <h1>Set New Password</h1>

                {/* ALL INPUTS */}

                {/* input-1 */}
                <div>
                    <input
                        type={Eye(open).type}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={Inputs(eng, ru).InputPassword}
                        // autoComplete='off'
                        autoComplete="new-password"
                    />
                    <div onClick={() => setOpen(!open)} className='eye'>
                        {Eye(open).sign}
                    </div>
                </div>

                {/* END OF INPUTS */}

                {/* BUTTON */}

                <div>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        className='login-button'>

                        Change password
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SetNewPassword
