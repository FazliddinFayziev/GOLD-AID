import React, { useContext, useEffect, useState, useReducer } from 'react';
import { changeLanguage } from './Functions';
import reducer from './reducer';
import { types } from './types';


const AppContext = React.createContext();

const initialState = {
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    score: '',
    level: '',
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // useState for language and Login Page
    const [language, setLanguage] = useState("English")
    const [languageBoolean, setLanguageBoolean] = useState({ eng: true, ru: false, uz: false })
    const [open, setOpen] = useState(true);

    // LOGGIN AND REGISTER LOGICS
    const [isRegister, setIsRegister] = useState(false);

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

    // Navigate to Warning Page
    // const NavigateToWarningPage = () => {
    //     dispatch({
    //         type: types.NAVIGATE_TO_WARNING
    //     })
    // }

    // "Take TEST button" on Register Page
    const RegisterTestButton = () => {
        dispatch({
            type: types.REGISTER_PAGE_BUTTON
        })
    }



    return <AppContext.Provider value={{
        ...state,
        open,
        setOpen,
        language,
        setLanguage,
        languageBoolean,
        handleInputChange,
        RegisterTestButton,
        setLanguageBoolean,

        isRegister,
        setIsRegister,
        // NavigateToWarningPage,
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

