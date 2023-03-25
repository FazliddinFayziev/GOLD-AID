import React, { useContext, useEffect, useState, useReducer } from 'react';
import { changeLanguage } from './Functions';
import reducer from './reducer';
import { types } from './types';


const AppContext = React.createContext();

const initialState = {
    name: '',
    age: '',
    email: '',
    password: '',
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // useState for language and Login Page
    const [language, setLanguage] = useState("English")
    const [languageBoolean, setLanguageBoolean] = useState({ eng: true, ru: false, uz: false })
    const [checkStrong, setCheckStrong] = useState({ weak: true, good: false, strong: false })
    const [open, setOpen] = useState(true);

    // Change the Language Function
    useEffect(() => {
        changeLanguage(language, setLanguageBoolean)
    }, [language])


    // Targetting value of inputs
    const handleInputChange = (e) => {
        dispatch({
            type: types.TARGET,
            key: e.target.name,
            value: e.target.value,
        });
    };



    return <AppContext.Provider value={{
        ...state,
        open,
        setOpen,
        language,
        checkStrong,
        setLanguage,
        setCheckStrong,
        languageBoolean,
        setLanguageBoolean,
        handleInputChange
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

