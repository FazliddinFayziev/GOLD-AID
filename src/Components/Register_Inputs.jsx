import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/context';
import Inputs, { Eye, EmailCheck, checkPassword, checkConfirmPassword, } from '../Data/Inputs';
import CircleLoading from './CircleLoading';




const Register_Inputs = () => {
    // GLOBAL ============================>

    const {
        age,
        name,
        open,
        email,
        gender,
        setOpen,
        password,
        setErrMsg,
        setShowCard,
        setFocusText,
        setIsRegister,
        languageBoolean,
        handleInputChange,
        setShowSuccessCard,
    } = useGlobalContext();

    // LOCAL ============================>

    // ALL USESTATE()

    // Password check

    const [checkStrong, setCheckStrong] = useState({
        weak: false,
        good: false,
        strong: false
    });

    // Confirm Password

    const [checkStrongConfirm, setCheckStrongConfirm] = useState({
        weakCon: false,
        goodCon: false,
        strongCon: false
    });


    // OTHER USESTATES()

    const [isEmail, setIsEmail] = useState(false)
    const [confirmInputValue, setConfirmInputValue] = useState('')
    const [registerLoading, setRegisterLoading] = useState(false)


    // OTHER FUNCTIONS

    const { weak, good, strong } = checkStrong;
    const { weakCon, goodCon, strongCon } = checkStrongConfirm;
    const { ru, eng } = languageBoolean;

    // USENAVIGATE

    const navigate = useNavigate();



    // ALL USEEFFECT()

    // Password check

    useEffect(() => {
        checkPassword(password, setCheckStrong)
    }, [password, confirmInputValue])

    useEffect(() => {
        checkConfirmPassword(confirmInputValue, setCheckStrongConfirm, password)
    }, [confirmInputValue, password])



    // Email check

    useEffect(() => {
        EmailCheck(email, setIsEmail)
    }, [email])


    // Password MinLength-6 and MaxLength-12


    // MAIN FUNCTION ============================>

    // LOGIN PAGE FUNCTION. CHECKING WETHER USER ISREGESTERED FALSE OR TRUE

    const CheckIsRegistered = async () => {
        setRegisterLoading(true)
        try {
            const response = await axios.post('/isregistered',
                JSON.stringify({ email: email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            setIsRegister(true)
            // console.log(response.data.isRegistered)
            navigate("/warning")
            setRegisterLoading(false)
        } catch (err) {
            if (!err?.response) {
                setRegisterLoading(false)
                setShowCard(true)
                setErrMsg(eng ? 'No Server Response' : ru ? "Нет ответа сервера" : "Server javobi yo'q");
            } else if (err.response?.status === 404) {
                setRegisterLoading(false)
                setShowCard(true)
                setErrMsg(eng ? 'Not found' : ru ? "Не найдено" : "Topilmadi");
            } else if (err.response?.status === 400 && name !== "" && age !== "" && gender !== "" && isEmail && strong && strongCon) {
                setRegisterLoading(false)
                setShowCard(true)
                setErrMsg(eng ? "This Email is wrong or taken" : ru ? "Это электронное письмо неверно или занято" : "Bu e-pochta noto‘g‘ri yoki band, iltimos boshqa elektron pochta kiriting");
            }
            else {
                setRegisterLoading(false)
                setShowCard(true)
                setErrMsg(eng ? 'Registration Failed!' : ru ? "Регистрация не удалась" : "Ro‘yxatdan o‘tish amalga oshmadi!")
            }
        }

    }

    const handleNavigate = async (e) => {
        e.preventDefault();
        if (
            email === "" ||
            !isEmail ||
            gender === "" ||
            !strong ||
            !strongCon ||
            confirmInputValue === "" ||
            password === ""
        ) {
            setRegisterLoading(false);
            setShowCard(true);
            setErrMsg(
                eng
                    ? "Please fill all inputs correctly"
                    : ru
                        ? "Пожалуйста, заполните все поля правильно"
                        : "Iltimos, barcha maʼlumotlarni toʻgʻri toʻldiring"
            );
        } else if (name === "" || name.length < 3) {
            setRegisterLoading(false);
            setShowCard(true);
            setErrMsg(
                eng
                    ? "name should include at least 3 characters"
                    : ru
                        ? "имя должно содержать не менее 3 символов"
                        : "ism kamida 3 ta belgidan iborat bo'lishi kerak"
            );
        } else if (age === "" || age > 100 || age < 0) {
            setRegisterLoading(false);
            setShowCard(true);
            setErrMsg(
                eng
                    ? "please put correct age"
                    : ru
                        ? "Пожалуйста, укажите правильный возраст"
                        : "Iltimos, yoshni to'g'ri belgilang"
            );
        } else {
            await CheckIsRegistered();
        }
    };


    // LOADING
    if (registerLoading) {
        return <CircleLoading />
    }

    const handleInputFocus = () => {
        setFocusText(Inputs(eng, ru).PasswordText)
        setShowSuccessCard(true);
    };

    const handleInputBlur = () => {
        setShowSuccessCard(false);
    };


    const handleConfirmFocus = () => {
        setFocusText(Inputs(eng, ru).ConfirmPasswordText)
        setShowSuccessCard(true);
    };

    const handleConfirmBlur = () => {
        setShowSuccessCard(false);
    };


    // MAIN REGISTRATION
    return (
        <>
            <div className="container-inputs">
                <div className="register-inputs">

                    {/* TEXT */}

                    <h1>{Inputs(eng, ru).Register}</h1>

                    {/* ALL INPUTS */}

                    {/* input-1 */}
                    <div className='form'>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => handleInputChange(e)}
                            required
                            autoComplete="off"
                        />
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">{Inputs(eng, ru).InputName}</span>
                        </label>
                    </div>

                    {/* input-2 */}
                    <div className='form'>
                        <input
                            type="number"
                            name="age"
                            value={age}
                            onChange={(e) => handleInputChange(e)}
                            required
                            autoComplete="off" />
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">{Inputs(eng, ru).InputAge}</span>
                        </label>
                    </div>

                    {/* input-3 select */}
                    <div className='form'>
                        <select name='gender' value={gender} onChange={(e) => handleInputChange(e)}>
                            <option value="Gender">{Inputs(eng, ru).InputGender}</option>
                            <option value="M">{Inputs(eng, ru).InputMale}</option>
                            <option value="F">{Inputs(eng, ru).InputFemale}</option>
                        </select>
                    </div>

                    {/* input-5 */}
                    <div className='form'>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => handleInputChange(e)}
                            required
                            // autoComplete="off"
                            autoComplete="new-password"
                        />
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">{Inputs(eng, ru).InputEmail}</span>
                        </label>
                    </div>

                    {/* input-6 */}
                    <div className='form'>
                        <input
                            type={Eye(open).type}
                            name="password"
                            value={password}
                            onChange={(e) => handleInputChange(e)}
                            required
                            // autoComplete="off"
                            autoComplete="new-password"
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">{Inputs(eng, ru).InputPassword}</span>
                        </label>
                        <div onClick={() => setOpen(!open)} className='eye'>
                            {Eye(open).sign}
                        </div>
                    </div>
                    <div className={weak ? "red-password" : good ? "yellow-password" : strong ? "green-password" : ""}></div>

                    {/* input-7 */}
                    <div className='form'>
                        <input
                            type={Eye(open).type}
                            name="confirmPassword"
                            value={confirmInputValue}
                            onChange={(e) => setConfirmInputValue(e.target.value)}
                            required
                            autoComplete="off"
                            onFocus={handleConfirmFocus}
                            onBlur={handleConfirmBlur}
                        />
                        <label htmlFor="name" className="label-name">
                            <span className="content-name">{Inputs(eng, ru).InputConfirmPassword}</span>
                        </label>
                        <div onClick={() => setOpen(!open)} className='eye'>
                            {Eye(open).sign}
                        </div>
                    </div>
                    <div className={weakCon ? "red-password" : goodCon ? "yellow-password" : strongCon ? "green-password" : ""}></div>

                    {/* END OF INPUTS */}

                    {/* BUTTON */}

                    <div className='form-for-button'>
                        <button
                            type='submit'
                            className='test-button'
                            onClick={handleNavigate}
                        >
                            {Inputs(eng, ru).RegisterButton}
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Register_Inputs
