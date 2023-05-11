import { RegisterNavbar, Register_Inputs, ShowCard, SuccessCard } from "../../Components"
import { register_img } from "../../assets";
import { useGlobalContext } from '../../context/context';

const Register = () => {
    const { errMsg, focusText } = useGlobalContext();


    return (
        <>
            <ShowCard message={errMsg} />
            <SuccessCard message={focusText} />
            <div className="main-container">
                <div className="part-one">
                    <RegisterNavbar />
                    <Register_Inputs />
                </div>

                <div className="part-two">
                    <img src={register_img} alt="gold-aid-register" />
                    <div className="cover"></div>
                </div>

            </div>
        </>
    );
}

export default Register
