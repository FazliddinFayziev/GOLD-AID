
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
export const changeLoginAndRegister = (currentPath, setLog) => {
    if (currentPath === "/login") {
        setLog(false)
    } else if (currentPath === "/register") {
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
export const getLevel = (myScore) => {
    let level;
    let b = "BEGINNER";
    let e = "ELEMENTARY";
    let p = "PRE-INTERMEDIATE";
    let i = "INTERMEDIATE";
    let u = "UPPER-INTERMEDIATE";
    let ielts = "IELTS";
    if (myScore >= 0 && myScore <= 10) {
        level = b
    } else if (myScore >= 0 && myScore <= 10) {
        level = e
    } else if (myScore >= 11 && myScore <= 15) {
        level = p
    } else if (myScore >= 16 && myScore <= 20) {
        level = i
    } else if (myScore >= 21 && myScore <= 25) {
        level = u
    } else if (myScore >= 26 && myScore <= 30) {
        level = ielts
    }
    return level;
}

// TURNING FRONTEND SCORES TO BACKEND SCORE FOR SENDING IT TO BACKEND.
export const backendScore = (myLevel) => {
    let score = 0;
    let b = "BEGINNER";
    let e = "ELEMENTARY";
    let p = "PRE-INTERMEDIATE";
    let i = "INTERMEDIATE";
    let u = "UPPER-INTERMEDIATE";
    let ielts = "IELTS";
    if (myLevel === b) {
        score = 0
    } else if (myLevel === e) {
        score = 1
    } else if (myLevel === p) {
        score = 2
    } else if (myLevel === i) {
        score = 3
    } else if (myLevel === u) {
        score = 4
    } else if (myLevel === ielts) {
        score = 5
    }
    return score;
}



// token in localStorage
export const setTokenToLocalStorage = (refreshToken, expiresIn) => {
    const accessTokenExpireTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('accessTokenExpireTime', accessTokenExpireTime);
};

