import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import { changeLoginAndRegister } from '../context/Functions';
import Inputs from '../Data/Inputs';

const LoginNavbar = () => {
    const { setLanguage, languageBoolean } = useGlobalContext();
    const { ru, eng } = languageBoolean
    const [log, setLog] = useState(true)
    const href = window.location.href;
    useEffect(() => {
        changeLoginAndRegister(href, setLog)
    }, [href])

    return (
        <div className="register-nav">
            <div className="register-nav-container">
                <ul className="nav-text">{Inputs(eng, ru).About}</ul>
                <ul className="nav-text">{Inputs(eng, ru).Contact}</ul>
                <Link to={log ? "/login" : "/register"} className='nav-text'>
                    <ul className="nav-text hide-login">{log ? Inputs(eng, ru).Login : Inputs(eng, ru).RegisterNav}</ul>
                </Link>
                <ul>
                    <select onChange={(e) => setLanguage(e.target.value)} className="nav-select">
                        <option value="English">{Inputs(eng, ru).myLanguage}</option>
                        {<option value="English">{Inputs(eng, ru).English}</option>}
                        <option value="Russian">{Inputs(eng, ru).Russian}</option>
                        <option value="Uzbek">{Inputs(eng, ru).Uzbek}</option>
                    </select>
                </ul>
            </div>
        </div>
    )
}

export default LoginNavbar