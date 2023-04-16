import "../css/Homework/homework.css";
import React, { useEffect } from 'react';
import { useGlobalContext } from "../context/context";

const HomeworkTimer = () => {

    // GLOBAL
    const { timeLeft, setTimeLeft, bgColor } = useGlobalContext();

    // LOCAL
    useEffect(() => {
        if (timeLeft <= 0) return;
        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = Math.floor(timeLeft % 60);

    return (
        <div className="homework-countdown-timer">
            <div className={bgColor ? "homework-countdown-timer-text-white" : "homework-countdown-timer-text-black"}>
                <span className="homework-countdown-timer-hours">{hours.toString().padStart(2, "0")}</span>
                <span className="homework-countdown-timer-separator">:</span>
                <span className="homework-countdown-timer-minutes">{minutes.toString().padStart(2, "0")}</span>
                <span className="homework-countdown-timer-separator">:</span>
                <span className="homework-countdown-timer-seconds">{seconds.toString().padStart(2, "0")}</span>
            </div>
            <svg className="homework-countdown-timer-svg">
                <circle
                    className="homework-countdown-timer-circle"
                    cx="50%"
                    cy="50%"
                    r="48%"
                    stroke="#fff"
                    strokeWidth="4%"
                />
                <circle
                    className="homework-countdown-timer-progress"
                    cx="50%"
                    cy="50%"
                    r="48%"
                    stroke="#4461F2"
                    strokeWidth="4%"
                    strokeDasharray={`${(
                        ((3600 - timeLeft) / 3600) *
                        2 *
                        Math.PI *
                        48
                    ).toFixed(0)}% 300%`}
                />
            </svg>
        </div>
    );
}

export default HomeworkTimer
