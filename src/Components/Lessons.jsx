import React from 'react';
import { useGlobalContext } from '../context/context';
import '../LessonsCSS/lessons.css';
import ProgressBar from './ProgressBar';
import LessonCard from './LessonCard';

const Lessons = () => {
    const { bgColor } = useGlobalContext();
    return (
        <>
            <div className='lessons-container'>
                <div className='lessons-title'>
                    <h1 className={bgColor ? 'white' : 'black'}>Lessons</h1>
                </div>
                <ProgressBar value={70} maxValue={100} />
                <div className='lessons-cards'>
                    <LessonCard />
                </div>
            </div>
        </>
    )
}

export default Lessons
