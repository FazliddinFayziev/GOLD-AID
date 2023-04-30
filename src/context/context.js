import React, { useContext, useEffect, useState, useReducer } from 'react';
import { changeLanguage } from './Functions';
import reducer from './reducer';
import { types } from './types';
import { DashboardTypes } from './DashboardPathNames';


const AppContext = React.createContext();

const initialState = {
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    backendScore: 0,
    courseName: '',
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
    // error messsage
    const [errMsg, setErrMsg] = useState('');
    // show card
    const [showCard, setShowCard] = useState(false);

    // USESTATE() FOR TIMING FUNCTIONS
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

    // Change the Language Function
    useEffect(() => {
        changeLanguage(language, setLanguageBoolean)
    }, [language])

    // USESTATE() FOR USERS ACCESS TOKEN
    const [user, setUser] = useState({})


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

    // Changing the dahsbord element names
    const [dashboardElement, setDashboardElement] = useState(DashboardTypes.DASHBOARD)


    // SIDEBAR
    const [sideBar, setSideBar] = useState(false);

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

        // error message
        errMsg,
        setErrMsg,

        // show card
        showCard,
        setShowCard,

        // calculate score for backend
        Calculate,

        // SIDEBAR
        sideBar,
        setSideBar,

        // DASHBOARD
        dashboardElement,
        setDashboardElement,

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

