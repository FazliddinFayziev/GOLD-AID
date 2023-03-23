import React from 'react'
import { useGlobalContext } from '../context/context';
import Inputs, { Eye } from '../Data/Inputs';



const Register_Inputs = () => {
    const { languageBoolean, open, setOpen } = useGlobalContext();
    const { ru, eng } = languageBoolean;

    return (
        <div className="container-inputs">
            <div className="register-inputs">

                {/* TEXT */}

                <h1>{Inputs(eng, ru).Register}</h1>

                {/* ALL INPUTS */}

                {/* input-1 */}
                <div>
                    <input type="text" placeholder={Inputs(eng, ru).InputName} />
                </div>

                {/* input-2 */}
                <div>
                    <input type="number" placeholder={Inputs(eng, ru).InputAge} />
                </div>

                {/* input-3 select */}
                <div>
                    <select>
                        <option>{Inputs(eng, ru).InputGender}</option>
                        <option>{Inputs(eng, ru).InputMale}</option>
                        <option>{Inputs(eng, ru).InputFemale}</option>
                    </select>
                </div>

                {/* input-4 */}
                <div>
                    <input type="text" placeholder={Inputs(eng, ru).InputUsername} />
                </div>

                {/* input-5 */}
                <div>
                    <input type="email" placeholder={Inputs(eng, ru).InputEmail} />
                </div>

                {/* input-6 */}
                <div>
                    <input type={Eye(open).type} placeholder={Inputs(eng, ru).InputPassword} />
                    <div onClick={() => setOpen(!open)} className='eye'>
                        {Eye(open).sign}
                    </div>
                </div>

                {/* input-7 */}
                <div>
                    <input type={Eye(open).type} placeholder={Inputs(eng, ru).InputConfirmPassword} />
                    <div onClick={() => setOpen(!open)} className='eye'>
                        {Eye(open).sign}
                    </div>
                </div>

                {/* END OF INPUTS */}

                {/* BUTTON */}

                <div>
                    <button className='test-button'>{Inputs(eng, ru).RegisterButton}</button>
                </div>

            </div>

        </div>
    )
}

export default Register_Inputs
