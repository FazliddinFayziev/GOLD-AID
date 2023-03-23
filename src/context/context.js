import React, { useContext, useEffect, useState } from 'react';
import { changeLanguage } from './Functions';


const AppContext = React.createContext();

export const AppProvider = ({ children }) => {

    // useState for language and Login Page
    const [language, setLanguage] = useState("English")
    const [languageBoolean, setLanguageBoolean] = useState({ eng: true, ru: false, uz: false })
    const [open, setOpen] = useState(true);

    // Change the Language Function
    useEffect(() => {
        changeLanguage(language, setLanguageBoolean)
    }, [language])



    return <AppContext.Provider value={{
        open,
        setOpen,
        language,
        setLanguage,
        languageBoolean,
        setLanguageBoolean
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

