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
    backendScore: 0,
    backendLevel: '',
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // useState for language and Login Page
    const [language, setLanguage] = useState("English")
    const [languageBoolean, setLanguageBoolean] = useState({ eng: true, ru: false, uz: false })
    const [open, setOpen] = useState(true);

    // USESTATE() LOADING BOOLEAN
    const [isLoading, setIsLoading] = useState(true);

    // USESTATE() BACKGROUND COLOR
    const [bgColor, setBgColor] = useState(true)


    // LOGGIN AND REGISTER LOGICS AND HOME
    const [isRegister, setIsRegister] = useState(false);

    // USESTATE() FOR TIMING FUNCTIONS
    const [timeLeft, setTimeLeft] = useState(30); // 1 hour in seconds

    // Change the Language Function
    useEffect(() => {
        changeLanguage(language, setLanguageBoolean)
    }, [language])

    // USESTATE() FOR USERS ACCESS TOKEN
    const [user, setUser] = useState({})

    // USEEFFECT() FOR USERS ACCESS TOKEN
    useEffect(() => {

    }, [])


    // Targetting value of inputs
    const handleInputChange = (e) => {
        dispatch({
            type: types.TARGET,
            key: e.target.name,
            value: e.target.value,
        });
    };

    // navigate to home and set isDone to (true)
    const ContinueButton = () => {
        dispatch({
            type: types.NAVIGATE_TO_HOME
        })
    }

    // Backend Score and BackendLevel
    const Calculate = (level, score) => {
        dispatch({
            type: types.CALCULATE,
            level: level,
            score: score,
        })
    }





    return <AppContext.Provider value={{
        ...state,

        // Logic with User token
        user,
        setUser,

        // LOADING
        isLoading,
        setIsLoading,

        // bg color
        bgColor,
        setBgColor,


        Calculate,

        open,
        setOpen,
        language,
        timeLeft,
        isRegister,
        setTimeLeft,
        setLanguage,
        setIsRegister,
        ContinueButton,
        languageBoolean,
        handleInputChange,
        setLanguageBoolean,
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

