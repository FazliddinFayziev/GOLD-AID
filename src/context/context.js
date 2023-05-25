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
    const [bgColor, setBgColor] = useState(true);

    // Check Admin
    const [checkAdmin, setCheckAdmin] = useState(false);

    // LOGGIN AND REGISTER LOGICS AND HOME
    const [isRegister, setIsRegister] = useState(false);
    // error messsage
    const [errMsg, setErrMsg] = useState('');
    // show card
    const [showCard, setShowCard] = useState(false);

    // Success card show
    const [showSuccessCard, setShowSuccessCard] = useState(false);

    // Set ShowCard false after 5 second
    useEffect(() => {
        setTimeout(() => setShowCard(false), 10000);
    }, [showCard]);

    // USESTATE() FOR TIMING FUNCTIONS
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds


    const [lessonsHomeWorkTimeLeft, setLessonsHomeWorkTimeLeft] = useState(0); // It will be set up when user comes to homeWork page

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

    // Set video
    const [isVideo, setIsVideo] = useState([]);

    // Comment USESTATE()
    const [comments, setComments] = useState([]);

    // Admin User
    const [adminUser, setAdminUser] = useState([]);

    // Homework Array with objects
    const [homeworkArray, setHomeworkArray] = useState([]);

    // Get DashboardInfo
    const [getDashInfo, setGetDashInfo] = useState([]);

    // USER INFO ADMIN PANNEL
    const [userInfo, setUserInfo] = useState([]);

    // Video Language
    const [videoLanguage, setVideoLanguage] = useState('uzbek');

    // Text for showcard while it is on the focus for Register page
    const [focusText, setFocusText] = useState('');

    // const refresh the comments by usign the USEEFFECT() 
    const [changeComment, setChangeComment] = useState(false);

    // limit and skip of comments
    const [limSkipComments, setLimSkipComments] = useState({ lim: 10, skip: 0 })

    // Scroll Loading
    const [scrollLoading, setScrollLoading] = useState(false)

    // USER Profile Picture
    const [userProfilePicture, setUserProfilePicture] = useState('');


    // ADMIN PANEL ==================================================> 

    const [singleAdminLesson, setSingleAdminLesson] = useState([])


    // UPLOAD VIDEO UZ
    const [selectedFileUz, setSelectedFileUz] = useState(null);

    // UPLOAD VIDEO RU
    const [selectedFileRu, setSelectedFileRu] = useState(null);

    // UPLOAD VIDEO ENG
    const [selectedFileEng, setSelectedFileEng] = useState(null);




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


    // USESTATE() USERS PROFILEPAGE
    const [userProfilePage, setUserProfilePage] = useState([])


    // Avatars
    const [avatars, setAvatars] = useState([]);

    // Change ProfileImage
    const [changeProfileImage, setChangeProfileImage] = useState(false);

    // CHECK BOX
    const [isChecked, setIsChecked] = useState(false); // Checkbox 

    // CHANGE ADMIN-COURSES
    const [changeAdminCourse, setChangeAdminCourse] = useState(false);


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

        // Check Admin
        checkAdmin,
        setCheckAdmin,

        // bg color
        bgColor,
        setBgColor,

        // error message
        errMsg,
        setErrMsg,

        // show card
        showCard,
        setShowCard,

        // Success card
        showSuccessCard,
        setShowSuccessCard,

        // calculate score for backend
        Calculate,

        // GET DASHBOARD INFO
        getDashInfo,
        setGetDashInfo,

        // SIDEBAR
        sideBar,
        setSideBar,

        // USER INFO
        userInfo,
        setUserInfo,

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

        // Profile Picture
        userProfilePicture,
        setUserProfilePicture,

        // Lessons
        lessons,
        setLessons,

        // Single video page Lessons
        singleLesson,
        setSingleLesson,

        // Set Video
        isVideo,
        setIsVideo,

        // Video Language
        videoLanguage,
        setVideoLanguage,

        // Focus Text
        focusText,
        setFocusText,

        // Comments Object/Array
        comments,
        setComments,

        // Change comments
        changeComment,
        setChangeComment,

        // Limit and Skip of Comments
        limSkipComments,
        setLimSkipComments,

        // Scroll Loaading
        scrollLoading,
        setScrollLoading,

        // HomeWork Array with objects
        homeworkArray,
        setHomeworkArray,

        // lessonsHomeWorkTimeLeft
        lessonsHomeWorkTimeLeft,
        setLessonsHomeWorkTimeLeft,

        // User Profile Page
        userProfilePage,
        setUserProfilePage,

        // User Avatars
        avatars,
        setAvatars,

        // Change Profile Image
        changeProfileImage,
        setChangeProfileImage,

        // Admin User
        adminUser,
        setAdminUser,


        // Admin pannel ================================>
        singleAdminLesson,
        setSingleAdminLesson,

        // Video UZ
        selectedFileUz, setSelectedFileUz,

        // Video RU
        selectedFileRu, setSelectedFileRu,

        // Video ENG
        selectedFileEng, setSelectedFileEng,

        // CHECK BOX
        isChecked, setIsChecked,

        // ADMIN CHANGE COURSE
        changeAdminCourse, setChangeAdminCourse,

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

