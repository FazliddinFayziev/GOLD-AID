import React from 'react';
import { useGlobalContext } from '../context/context';
import Inputs from '../Data/Inputs';

const WarningNav = () => {
    const { setLanguage, languageBoolean } = useGlobalContext();
    const { ru, eng } = languageBoolean

    return (
        <div className="start-navbar">
            <div className="start-navbar-container">
                < ul className="nav-text" > {Inputs(eng, ru).About}</ul >
                <ul className="nav-text">{Inputs(eng, ru).Contact}</ul>
                <ul>
                    <select onChange={(e) => setLanguage(e.target.value)} className="nav-select">
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




    // < ul className = "nav-text" > { Inputs(eng, ru).About }</ul >
    //             <ul className="nav-text">{Inputs(eng, ru).Contact}</ul>
    //             <ul>
    //                 <select onChange={(e) => setLanguage(e.target.value)} className="nav-select">
    //                     <option value="English">{Inputs(eng, ru).myLanguage}</option>
    //                     {<option value="English">{Inputs(eng, ru).English}</option>}
    //                     <option value="Russian">{Inputs(eng, ru).Russian}</option>
    //                     <option value="Uzbek">{Inputs(eng, ru).Uzbek}</option>
    //                 </select>
    //             </ul>