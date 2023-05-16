import { useEffect, useState } from "react";
import { RegisterNavbar, Register_Inputs, ShowCard, SuccessCard } from "../../Components"
import { randomMidjourney } from "../../Data/data";
import { useGlobalContext } from '../../context/context';

const Register = () => {
    const { errMsg, focusText } = useGlobalContext();
    const [randomPic, setRandomPic] = useState(8);

    useEffect(() => {
        // RANDOM Pictures
        const ReadyrandomPic = Math.floor(Math.random() * randomMidjourney.length);
        setRandomPic(ReadyrandomPic)
    }, [])

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
                    <img src={randomMidjourney[randomPic].img} alt="gold-aid-register" />
                    <div className="cover"></div>
                </div>

            </div>
        </>
    );
}

export default Register
