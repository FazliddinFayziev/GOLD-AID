import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { useGlobalContext } from '../context/context';
import { setTokenToLocalStorage } from '../context/Functions';


const Verifying = () => {
    const { setUser } = useGlobalContext();
    const navigate = useNavigate();
    const { token } = useParams();

    // USEEFFECT()
    useEffect(() => {
        VerifyingEmail();
    }, [])



    const VerifyingEmail = async () => {
        try {
            const res = await axios.post('/verifyemail', {
                token: token
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const { accessToken, refreshToken } = res.data
            setUser({ accessToken });
            setTokenToLocalStorage(refreshToken, 3600, 604800) // Local Storage with TOKENS

            return navigate('/')
        } catch (err) {
            console.log(err.response.data.err)
            navigate('/register')
        }
    }

    return (
        <div className="verifying-page">
            <h1 className="verifying-header">Verifying Your Email</h1>

            {/* Loading */}
            <div className="verifying-loading-container">
                <div className="verifying-spinner"></div>
            </div>

        </div>
    );
}

export default Verifying
