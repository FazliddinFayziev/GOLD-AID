import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/context';
import Inputs, { checkConfirmPassword, checkPassword, EmailCheck, Eye } from '../Data/Inputs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Register_Inputs = () => {
    // GLOBAL
    const { languageBoolean, open, setOpen, name, age, email, password, gender, handleInputChange, setIsRegister } = useGlobalContext();
    // LOCAL USESTATE();
    const [checkStrong, setCheckStrong] = useState({ weak: false, good: false, strong: false });
    const [checkStrongConfirm, setCheckStrongConfirm] = useState({ weakCon: false, goodCon: false, strongCon: false });
    const [isEmail, setIsEmail] = useState(false)
    const [confirmInputValue, setConfirmInputValue] = useState('');
    // NONE USESTATE();
    const { weak, good, strong } = checkStrong;
    const { weakCon, goodCon, strongCon } = checkStrongConfirm;
    const { ru, eng } = languageBoolean;

    const navigate = useNavigate();

    // ALL USEEFFECT()
    useEffect(() => {
        checkPassword(password, setCheckStrong)
    }, [password, confirmInputValue])

    useEffect(() => {
        checkConfirmPassword(confirmInputValue, setCheckStrongConfirm, password)
    }, [confirmInputValue, password])

    useEffect(() => {
        EmailCheck(email, setIsEmail)
    }, [email])

    // IMPORTANT FUNCTIONS
    // NAVIGATE LOGIC
    const handleNavigate = (e) => {
        e.preventDefault()
        if (name !== "" && age !== "" && gender !== "" && isEmail && strong && strongCon) {
            setIsRegister(true)
            navigate("/warning")
        } else {
            alert(eng ? "Please fill all inputs right" : ru ? "Пожалуйста, заполните все поля правильно" : "Iltimos, barcha maʼlumotlarni toʻgʻri toʻldiring")
        }
    }

    return (
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
                        <option value="Male">{Inputs(eng, ru).InputMale}</option>
                        <option value="Female">{Inputs(eng, ru).InputFemale}</option>
                    </select>
                </div>

                {/* input-5 */}
                <div className='form'>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => handleInputChange(e)}
                        required autoComplete="off"
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
                        autoComplete="off"
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

                <div className='form'>
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
    )
}

export default Register_Inputs
