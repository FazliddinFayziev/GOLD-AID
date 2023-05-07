import React from 'react';
import LessonCard from './LessonCard';
import '../css/LessonsCSS/lessons.css';
import ProgressBar from './ProgressBar';
import { useGlobalContext } from '../context/context';
import NoLessons from './NoLessons';

const Lessons = () => {
    const { bgColor, lessons } = useGlobalContext();
    return (
        <>
            <div className='lessons-container'>
                <div className='lessons-title'>
                    <h1 className={bgColor ? 'white' : 'black'}>Lessons</h1>
                </div>
                {lessons.length > 0 && (<ProgressBar value={50} maxValue={100} />)}
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
