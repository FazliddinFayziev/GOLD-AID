import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/context';
import { changeWarningAndTest } from '../context/Functions';
import Inputs from '../Data/Inputs';

const WarningNav = () => {
    const { setLanguage, languageBoolean } = useGlobalContext();
    const { ru, eng } = languageBoolean
    const [log, setLog] = useState(true)
    const href = window.location.href;
    useEffect(() => {
        changeWarningAndTest(href, setLog)
    }, [href])

    return (
        <div className="start-navbar">
            <div className="start-navbar-container">
                < ul className="nav-text" > {Inputs(eng, ru).About}</ul >
                <ul className="nav-text">{Inputs(eng, ru).Contact}</ul>
                <ul>
                    <select onChange={(e) => setLanguage(e.target.value)} className={log ? "select-hiden" : "nav-select"}>
                        <option value="English">{Inputs(eng, ru).English}</option>
                        <option value="Russian">{Inputs(eng, ru).Russian}</option>
                        <option value="Uzbek">{Inputs(eng, ru).Uzbek}</option>
                    </select>
                </ul>
            </div>
        </div>
    )
}

export default WarningNav