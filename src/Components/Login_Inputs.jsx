import React from 'react'
import { useGlobalContext } from '../context/context';
import Inputs, { Eye } from '../Data/Inputs';

const Login_Inputs = () => {
    const { languageBoolean, open, setOpen } = useGlobalContext();
    const { ru, eng } = languageBoolean;

    return (
        <div className="container-inputs-login">
            <div className="login-inputs">

                {/* TEXT */}

                <h1>{Inputs(eng, ru).Welcome}</h1>

                {/* ALL INPUTS */}

                {/* input-1 */}
                <div>
                    <input type="text" placeholder={Inputs(eng, ru).InputEmail} />
                </div>

                {/* input-2 */}
                <div>
                    <input type={Eye(open).type} placeholder={Inputs(eng, ru).InputPassword} />
                    <div onClick={() => setOpen(!open)} className='eye'>
                        {Eye(open).sign}
                    </div>
                </div>

                {/* forget login */}
                <h5>
                    {Inputs(eng, ru).Forgot}
                </h5>

                {/* END OF INPUTS */}

                {/* BUTTON */}

                <div>
                    <button className='login-button'>{Inputs(eng, ru).Login}</button>
                </div>

            </div>

        </div>
    )
}

export default Login_Inputs
