import React, { useContext, useEffect, useState, useReducer } from 'react';
import { changeLanguage } from './Functions';
import reducer from './reducer';
import { types } from './types';
import { DashboardTypes } from './DashboardPathNames';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';


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
    const [state, dispatch] = useReducer(reducer, initialState);

    // USENAVIGATE( )
    const navigate = useNavigate();

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


    // USESTATE() FOR COURSES 
    const [courses, setCourses] = useState([])

    // USESTATE() FOR LESSONS
    const [lessons, setLessons] = useState([])


    // USESTATE() FOR USER PROFILE
    const [userProfile, setUserProfile] = useState([])

    // Single video page Lessons
    const [singleLesson, setSingleLesson] = useState([]);

    // LESSON CARD TITLE
    const [lessonTitle, setLessonTitle] = useState('');

    // Lesson Card
    const [showCardLessons, setShowCardLessons] = useState(false);

    // Set video
    const [isVideo, setIsVideo] = useState([]);

    // Video Language
    const [videoLanguage, setVideoLanguage] = useState('uzbek');




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


    // Recieving the message for verification of email
    const [msg, setMsg] = useState("")


    // USESTATE() FOR USERS ACCESS TOKEN
    const [user, setUser] = useState({})


    // Make API call to refresh access token using refresh token
    const refreshAccessToken = async () => {
        try {
            const token = localStorage.getItem('refreshToken');

            const response = await axios.get('/newtoken', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const { accessToken } = response.data;
            const accessTokenExpireTime = new Date().getTime() + 3600 * 1000; // 1 hour of expiration time for access token

            setUser({ ...user, accessToken: accessToken });
            localStorage.setItem('accessTokenExpireTime', accessTokenExpireTime);

            return accessToken;
        } catch (error) {
            logOut()
            console.error(error);
        }
    };


    // LOG OUT FUNCTION
    const logOut = () => {
        setUser({})
        localStorage.setItem('refreshToken', '')
        return navigate('/login')
    }


    // IS ACCESS TOKEN EXPERED
    const accessTokenExpireTime = localStorage.getItem('accessTokenExpireTime');

    const isAccessTokenExpired = () => {
        const currentTime = new Date().getTime();
        return currentTime > accessTokenExpireTime;
    };








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

        // Courses
        courses,
        setCourses,

        // User Profile
        userProfile,
        setUserProfile,

        // Access Token
        refreshAccessToken,

        // Is access Token Expired
        isAccessTokenExpired,

        // Verify Email Message
        msg,
        setMsg,

        // Lessons
        lessons,
        setLessons,

        // Lessons Title
        lessonTitle,
        setLessonTitle,

        // Lessons Card
        showCardLessons,
        setShowCardLessons,

        // Single video page Lessons
        singleLesson,
        setSingleLesson,

        // Set Video
        isVideo,
        setIsVideo,

        // Video Language
        videoLanguage,
        setVideoLanguage,

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

