
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


// LEVEL CHECK
export const getLevel = (score) => {
    let level;
    let b = "BEGINNER";
    let e = "ELEMENTARY";
    let p = "PRE-INTERMEDIATE";
    let i = "INTERMEDIATE";
    let u = "UPPER-INTERMEDIATE";
    let ielts = "IELTS";
    if (score >= 0 && score <= 10) {
        level = b
    } else if (score >= 0 && score <= 10) {
        level = e
    } else if (score >= 11 && score <= 15) {
        level = p
    } else if (score >= 16 && score <= 20) {
        level = i
    } else if (score >= 21 && score <= 25) {
        level = u
    } else if (score >= 26 && score <= 30) {
        level = ielts
    }
    return level;
}

