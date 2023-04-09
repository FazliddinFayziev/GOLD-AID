import { RegisterNavbar, Register_Inputs, ShowCard } from "../Components"
import { register_img } from "../assets";
import { useGlobalContext } from '../context/context';

const Register = () => {
    const { setShowCard } = useGlobalContext();

    const handleClose = () => {
        setShowCard(false);
    }
    return (
        <>
            <ShowCard handleClose={handleClose} />
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
