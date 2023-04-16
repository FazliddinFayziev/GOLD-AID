import React from 'react';
import LessonCard from './LessonCard';
import '../css/LessonsCSS/lessons.css';
import ProgressBar from './ProgressBar';
import { lessonCards } from '../Data/data';
import { useGlobalContext } from '../context/context';

const Lessons = () => {
    const { bgColor } = useGlobalContext();
    return (
        <>
            <div className='lessons-container'>
                <div className='lessons-title'>
                    <h1 className={bgColor ? 'white' : 'black'}>Lessons</h1>
                </div>
                <ProgressBar value={50} maxValue={100} />
                <div className='lessons-cards'>
                    {
                        lessonCards.map((lessonCard, index) => {
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
