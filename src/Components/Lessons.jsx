import React from 'react';
import LessonCard from './LessonCard';
import '../css/LessonsCSS/lessons.css';
import ProgressBar from './ProgressBar';
import { useGlobalContext } from '../context/context';

const Lessons = () => {
    const { bgColor, lessons } = useGlobalContext();
    return (
        <>
            <div className='lessons-container'>
                <div className='lessons-title'>
                    <h1 className={bgColor ? 'white' : 'black'}>Lessons</h1>
                </div>
                <ProgressBar value={50} maxValue={100} />
                <div className='lessons-cards'>
                    {
                        lessons.map((lessonCard, index) => {
                            return (
                                <LessonCard key={index} {...lessonCard} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Lessons
