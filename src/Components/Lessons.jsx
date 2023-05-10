import React, { useEffect, useState } from 'react';
import LessonCard from './LessonCard';
import '../css/LessonsCSS/lessons.css';
import ProgressBar from './ProgressBar';
import { useGlobalContext } from '../context/context';
import NoLessons from './NoLessons';

const Lessons = () => {
    const { bgColor, lessons } = useGlobalContext();
    const [completedLessonsCount, setCompletedLessonsCount] = useState(0);


    // Calculating the progress value and maxValue
    useEffect(() => {
        let count = 0;
        for (let i = 0; i < lessons.length; i++) {
            if (lessons[i].isCompleted === true) {
                count++
            }
        }
        setCompletedLessonsCount(count)
    }, [lessons]);

    const progressObj = {
        value: completedLessonsCount,
        maxValue: lessons.length
    }
    const { value, maxValue } = progressObj


    return (
        <>
            <div className='lessons-container'>
                <div className='lessons-title'>
                    <h1 className={bgColor ? 'white' : 'black'}>Lessons</h1>
                </div>
                {lessons.length > 0 && (<ProgressBar value={value} maxValue={maxValue} />)}
                {
                    lessons.length > 0 ? (

                        <div className='lessons-cards'>
                            {
                                lessons.map((lesson, index) => {
                                    return (
                                        <LessonCard key={index} {...lesson} index={index} />
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <NoLessons />
                    )
                }
            </div>
        </>
    )
}

export default Lessons
