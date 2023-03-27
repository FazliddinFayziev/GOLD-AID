import React, { useState } from 'react';
import { questions, reading } from '../Data/data';
import "../css/test.css";
import FinishTest from './FinishTest';
import { useGlobalContext } from '../context/context';
import CountdownTimer from './CountdownTimer';


function getLevel(score, scoreReading) {
    let level;
    let b = "BEGINNER";
    let e = "ELEMENTARY";
    let p = "PRE-INTERMEDIATE";
    let i = "INTERMEDIATE";
    let u = "UPPER-INTERMEDIATE";
    if (score >= 0 && score <= 10 && scoreReading >= 0 && scoreReading <= 2) {
        level = b
    } else if (score >= 0 && score <= 10 && scoreReading >= 3 && scoreReading <= 4) {
        level = b
    } else if (score >= 0 && score <= 10 && scoreReading >= 5 && scoreReading <= 7) {
        level = b
    } else if (score >= 0 && score <= 10 && scoreReading >= 8 && scoreReading <= 9) {
        level = e
    } else if (score >= 0 && score <= 10 && scoreReading === 10) {
        level = b
    } else if (score >= 11 && score <= 20 && scoreReading >= 0 && scoreReading <= 2) {
        level = e
    } else if (score >= 11 && score <= 20 && scoreReading >= 3 && scoreReading <= 4) {
        level = e
    } else if (score >= 11 && score <= 20 && scoreReading >= 5 && scoreReading <= 7) {
        level = e
    } else if (score >= 11 && score <= 20 && scoreReading >= 8 && scoreReading <= 9) {
        level = p
    } else if (score >= 11 && score <= 20 && scoreReading === 10) {
        level = e
    } else if (score >= 21 && score <= 30 && scoreReading >= 0 && scoreReading <= 2) {
        level = e
    } else if (score >= 21 && score <= 30 && scoreReading >= 3 && scoreReading <= 4) {
        level = p
    } else if (score >= 21 && score <= 30 && scoreReading >= 5 && scoreReading <= 7) {
        level = p
    } else if (score >= 21 && score <= 30 && scoreReading >= 8 && scoreReading <= 9) {
        level = p
    } else if (score >= 21 && score <= 30 && scoreReading === 10) {
        level = p
    } else if (score >= 31 && score <= 45 && scoreReading >= 0 && scoreReading <= 2) {
        level = p
    } else if (score >= 31 && score <= 45 && scoreReading >= 3 && scoreReading <= 4) {
        level = i
    } else if (score >= 31 && score <= 45 && scoreReading >= 5 && scoreReading <= 7) {
        level = i
    } else if (score >= 31 && score <= 45 && scoreReading >= 8 && scoreReading <= 9) {
        level = i
    } else if (score >= 31 && score <= 45 && scoreReading === 10) {
        level = i
    } else if (score >= 46 && score <= 50 && scoreReading >= 0 && scoreReading <= 2) {
        level = i
    } else if (score >= 46 && score <= 50 && scoreReading >= 3 && scoreReading <= 4) {
        level = i
    } else if (score >= 46 && score <= 50 && scoreReading >= 5 && scoreReading <= 7) {
        level = u
    } else if (score >= 46 && score <= 50 && scoreReading >= 8 && scoreReading <= 9) {
        level = u
    } else if (score >= 46 && score <= 50 && scoreReading === 10) {
        level = u
    }
    return level;
}

const Tests = () => {
    const { name, RegisterTestButton } = useGlobalContext();



    const [score, setScore] = useState(0);
    const [scoreReading, setScoreReading] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [level, setLevel] = useState("")
    const [big, setBig] = useState(false);

    const handleOptionSelect = (e, questionId) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: e.target.value });
    };


    // Whole logic of checking th tests
    const handleQuizSubmit = () => {
        let newScore = 0;
        let readingScore = 0;
        questions.forEach((question) => {
            if (selectedAnswers[question.id] === question.answer) {
                newScore++;
            }
        });
        reading.forEach((question) => {
            if (selectedAnswers[question.id] === question.answer) {
                readingScore++;
            }
        })
        setScore(newScore);
        setScoreReading(readingScore);
        setIsSubmitted(true);
        const level = getLevel(newScore, readingScore);
        setLevel(level);
    };

    return (
        <>

            <CountdownTimer />

            <div className={isSubmitted && "hidden"}>
                <div className='test-container'>
                    <h1 className='test-welcome-page'><p className='welcome'>Welcome {name}</p></h1>
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
                                // onClick={handleQuizSubmit}
                                onClick={RegisterTestButton}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {isSubmitted && (
                    <FinishTest score={score} level={level} scoreReading={scoreReading} />
                )}
            </div>
        </>
    );
}

export default Tests
