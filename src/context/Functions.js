
// CHANGE LANGUAGE
export const changeLanguage = (language, setLanguageBoolean) => {
    if (language === "English") {
        setLanguageBoolean({ eng: true, ru: false, uz: false })
    } else if (language === "Russian") {
        setLanguageBoolean({ eng: false, ru: true, uz: false })
    } else if (language === "Uzbek") {
        setLanguageBoolean({ eng: false, ru: false, uz: true })
    }
}


// CHANGE LOGIN AND REGISTER
export const changeLoginAndRegister = (href, setLog) => {
    if (href === "http://localhost:3000/login") {
        setLog(false)
    } else if (href === "http://localhost:3000/register") {
        setLog(true)
    }
}


// CHANGE TEST AND WARNING PAGES
export const changeWarningAndTest = (href, setLog) => {
    if (href === "http://localhost:3000/warning") {
        setLog(false)
    } else if (href === "http://localhost:3000/test") {
        setLog(true)
    }
}

