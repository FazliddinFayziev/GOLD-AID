import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/context';
import Loading from './Loading';
import "../css/Homework/homework.css";
import HomeworkTimer from './HomeworkTimer';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const HomeWorkTest = () => {

    // GLOBAL
    const { lessonsHomeWorkTimeLeft, homeworkArray, refreshAccessToken, user } = useGlobalContext();
    const { accessToken } = user;

    // LOCAL
    const [answersArray, setAnswersArray] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { level, lessonId } = useParams();
    const navigate = useNavigate();

    // LOADING USESTATE()
    const [isloading, setIsLoading] = useState(false);


    // USEEFFECT() FOR TIMING FUNCTION
    useEffect(() => {
        if (lessonsHomeWorkTimeLeft === 0) {
            handleQuizSubmit();
        }
    }, [lessonsHomeWorkTimeLeft])


    // Targeting the the chosen answers
    const handleOptionSelect = (e, homeworkId) => {
        setAnswersArray({ ...answersArray, [homeworkId]: e.target.value })
    }


    // Submitting the chosen answers 
    const SubmitHomeWork = async (token, homework) => {
        try {

            const res = await axios.put(`/lessons/homework/check/${lessonId}`, {
                homework
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            // console.log(res.data);
            const { msg } = res.data
            if (msg === "Congrats, you completed the lesson!") {
                navigate(`/${level}/success`)
            }
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'token is expired') {
                const refreshedToken = await refreshAccessToken(); // refresh the token
                SubmitHomeWork(refreshedToken, homework); // try the request again with the new token
            } else if (err.response.data.err === "You already completed this lesson") {
                navigate(`/${level}/already`)
            } else {
                console.log(err);
                console.log(err.response.data)
                navigate(`/${level}/failed`)
            }
        }
    };



    // Submitting the array of homework to backend
    const handleQuizSubmit = async () => {
        setIsLoading(true)
        const homework = homeworkArray.map((hw) => {
            const chosenAnswer = answersArray[hw._id] || "I do not know"; // Set an empty string if no answer is selected
            return {
                id: hw._id,
                chosenAnswer,
            };
        });
        // console.log(homework)
        await SubmitHomeWork(accessToken, homework);
        setIsSubmitted(true)
        setIsLoading(false)
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
            {lessonsHomeWorkTimeLeft > 0 && !isSubmitted && <HomeworkTimer />}
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
                                    onChange={(e) => {
                                        handleOptionSelect(e, homework._id)
                                    }}
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
        </>
    );
}

export default HomeWorkTest
