import React from 'react'
import { useGlobalContext } from '../context/context';
import Inputs, { Eye } from '../Data/Inputs';



const Register_Inputs = () => {
    const { languageBoolean, open, setOpen, name, age, email, handleInputChange } = useGlobalContext();
    const { ru, eng } = languageBoolean;

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
                    <select>
                        <option>{Inputs(eng, ru).InputGender}</option>
                        <option>{Inputs(eng, ru).InputMale}</option>
                        <option>{Inputs(eng, ru).InputFemale}</option>
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
                    <input type={Eye(open).type} name="password" required autoComplete="off" />
                    <label htmlFor="name" className="label-name">
                        <span className="content-name">{Inputs(eng, ru).InputPassword}</span>
                    </label>
                    <div onClick={() => setOpen(!open)} className='eye'>
                        {Eye(open).sign}
                    </div>
                </div>
                <div className='green-password'></div>

                {/* input-7 */}
                <div className='form'>
                    <input type={Eye(open).type} name="confirmPassword" required autoComplete="off" />
                    <label htmlFor="name" className="label-name">
                        <span className="content-name">{Inputs(eng, ru).InputConfirmPassword}</span>
                    </label>
                    <div onClick={() => setOpen(!open)} className='eye'>
                        {Eye(open).sign}
                    </div>
                </div>

                {/* END OF INPUTS */}

                {/* BUTTON */}

                <div className='form'>
                    <button className='test-button'>{Inputs(eng, ru).RegisterButton}</button>
                </div>

            </div>

        </div>
    )
}

export default Register_Inputs
