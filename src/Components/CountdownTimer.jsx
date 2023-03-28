import React, { useState, useEffect } from "react";
import "../css/CountdownTimer.css";

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(1800); // 1 hour in seconds

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
        <div className="countdown-timer">
            <div className="countdown-timer-text">
                <span className="countdown-timer-hours">{hours.toString().padStart(2, "0")}</span>
                <span className="countdown-timer-separator">:</span>
                <span className="countdown-timer-minutes">{minutes.toString().padStart(2, "0")}</span>
                <span className="countdown-timer-separator">:</span>
                <span className="countdown-timer-seconds">{seconds.toString().padStart(2, "0")}</span>
            </div>
            <svg className="countdown-timer-svg">
                <circle
                    className="countdown-timer-circle"
                    cx="50%"
                    cy="50%"
                    r="48%"
                    stroke="#b0afaf"
                    strokeWidth="4%"
                />
                <circle
                    className="countdown-timer-progress"
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
};

export default CountdownTimer;
