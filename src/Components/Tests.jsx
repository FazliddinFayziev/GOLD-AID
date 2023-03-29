import React, { useEffect, useState } from 'react';
import { questions } from '../Data/data';
import "../css/test.css";
import FinishTest from './FinishTest';
import { useGlobalContext } from '../context/context';
import CountdownTimer from './CountdownTimer';
import { backendScore, getLevel } from '../context/Functions';


const Tests = () => {
    const { name, timeLeft, setTimeLeft, Calculate } = useGlobalContext();



    const [score, setScore] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [level, setLevel] = useState("")

    const handleOptionSelect = (e, questionId) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: e.target.value });
    };


    // prevent REFREFING
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "";

            const confirmationMessage = "Are you sure you want to refresh the page?";
            const customEvent = new CustomEvent("beforeunload", {
                detail: confirmationMessage,
            });

            window.dispatchEvent(customEvent);

            return confirmationMessage;
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);


    // USEEFFECT() FOR TIMING FUNCTION
    useEffect(() => {
        if (timeLeft === 0) {
            handleQuizSubmit();
        }
    }, [timeLeft])



    // Whole logic of checking th tests
    const handleQuizSubmit = () => {
        let newScore = 0;
        questions.forEach((question) => {
            if (selectedAnswers[question.id] === question.answer) {
                newScore++;
            }
        });
        setScore(newScore);
        setIsSubmitted(true);
        const level = getLevel(newScore);
        setLevel(level);
        setTimeLeft(0);
        Calculate(level, backendScore(level));
    };

    return (
        <>
            {timeLeft > 0 && <CountdownTimer />}
            <div className={isSubmitted ? "hidden" : undefined}>
                <div className='test-container'>
                    <h1 className='test-welcome-page'><p className='welcome'>Welcome <span className='name-span'>{name}</span></p></h1>
                </div>
                {questions.map((question) => (
                    <div key={question.id} className="test-div">
                        <h3 className='test-question'>{question.id}) {question.text}</h3>
                        {question.options.map((option, index) => (
                            <label key={index} className="test-label">
                                <input
                                    className='test-input'
                                    type="radio"
                                    name={question.id}
                                    value={option.value}
                                    onChange={(e) => handleOptionSelect(e, question.id)}
                                    disabled={isSubmitted}
                                />
                                <span>{option.value}</span>
                            </label>
                        ))}
                    </div>
                ))}
                {!isSubmitted && (
                    <div className='button-container-for-test'>
                        <div className='test-button-container'>
                            <button className="test-button"
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
                    <FinishTest score={score} level={level} />
                )}
            </div>
        </>
    );
}

export default Tests
