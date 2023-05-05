import Inputs from '../Data/Inputs';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/context';
import { changeLoginAndRegister } from '../context/Functions';

const LoginNavbar = () => {

    // GLOBAL
    const { setLanguage, languageBoolean } = useGlobalContext();
    const { ru, eng } = languageBoolean

    // LOCAL
    const [log, setLog] = useState(true)
    const location = useLocation();
    const currentPath = location.pathname;
    useEffect(() => {
        changeLoginAndRegister(currentPath, setLog)
    }, [currentPath])

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
                        <option value="English">{Inputs(eng, ru).English}</option>
                        <option value="Russian">{Inputs(eng, ru).Russian}</option>
                        <option value="Uzbek">{Inputs(eng, ru).Uzbek}</option>
                    </select>
                </ul>
            </div>
        </div>
    )
}

export default LoginNavbar