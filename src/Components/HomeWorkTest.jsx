import React, { useEffect, useState } from 'react'
import { questions } from '../Data/data';
import { useGlobalContext } from '../context/context';
import { backendScore, getLevel } from '../context/Functions';
import Loading from './Loading';
import "../css/Homework/homework.css";
import HomeworkTimer from './HomeworkTimer';

const HomeWorkTest = () => {

    // GLOBAL
    const { lessonsHomeWorkTimeLeft, homeworkArray } = useGlobalContext();

    // LOCAL
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [level, setLevel] = useState("");
    const [randomQuestion, setRandomQuestion] = useState(0);

    // LOADING USESTATE()
    const [isloading, setIsLoading] = useState(true);

    const handleOptionSelect = (e, questionId) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: e.target.value });
    };


    // LOADING
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // RANDOM QUESTIONS
        const randomQuestions = Math.floor(Math.random() * questions.length);
        console.log(randomQuestions)
        setRandomQuestion(randomQuestions)
    }, [])


    // USEEFFECT() FOR TIMING FUNCTION
    useEffect(() => {
        if (lessonsHomeWorkTimeLeft === 0) {
            handleQuizSubmit();
        }
    }, [lessonsHomeWorkTimeLeft])



    // Whole logic of checking th tests
    const handleQuizSubmit = () => {


    };

    if (isloading) {
        return <Loading />
    }

    // TURNING THE ARRAY INTO OBJECT IN HOME OPTIONS ARRAY
    const OptionsArrayToObject = (array) => {
        const OptionsObjArr = array.map((option) => ({
            value: option,
        }));
        return OptionsObjArr
    }

    return (
        <>
            {lessonsHomeWorkTimeLeft > 0 && <HomeworkTimer />}
            <div className={isSubmitted ? "homework-hidden" : undefined}>
                <div className='homework-test-container'>
                    <h1 className='homework-test-welcome-page'><p className='welcome'>Good luck</p></h1>
                </div>
                {homeworkArray.map((homework, index) => (
                    <div key={homework._id} className="homework-test-div">
                        <h3 className='homework-test-question'>{index + 1}) {homework.question}</h3>
                        {OptionsArrayToObject(homework.options).map((option, index) => (
                            <label key={index} className="homework-test-label">
                                <input
                                    className='homework-test-input'
                                    type="radio"
                                    name={homework._id}
                                    value={option.value}
                                    onChange={(e) => handleOptionSelect(e, homework._id)}
                                    disabled={isSubmitted}
                                />
                                <span>{option.value}</span>
                            </label>
                        ))}
                    </div>
                ))}
                {!isSubmitted && (
                    <div className='homework-button-container-for-test'>
                        <div className='homework-test-button-container'>
                            <button className="homework-test-button"
                                onClick={handleQuizSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className='finish-test-container'>
                {isSubmitted && (
                    <div>
                        Test is Finished
                    </div>
                )}
            </div>
        </>
    );
}

export default HomeWorkTest
