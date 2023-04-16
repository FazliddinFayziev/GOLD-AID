import React from 'react';
import "../css/VideosCSS/homework.css"
import { useGlobalContext } from '../context/context';

const BeforeHomework = () => {
    const { bgColor } = useGlobalContext();
    return (
        <>
            <div className='files-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Homework</h1>
            </div>
            <div className='home-p-container'>
                <div className='homework-p-container'>
                    <div className={bgColor ? 'homework-p' : "homework-p-white"}>
                        <div className='home-ball'></div>
                        <p>By doing your home work, you will be able to get access to other lessons.</p>
                    </div>
                    <div className={bgColor ? 'homework-p' : "homework-p-white"}>
                        <div className='home-ball'></div>
                        <p>Uyga vazifalarni bajarish orqali, siz boshqa darslarga ham kira olasiz.</p>
                    </div>
                    <div className={bgColor ? 'homework-p' : "homework-p-white"}>
                        <div className='home-ball-2'></div>
                        <p>Выполняя домашнюю работу, вы сможете получить доступ к другим урокам.</p>
                    </div>
                </div>
            </div>
            <div className='home-work-button'>
                <button type='submit'>Do my Homework</button>
            </div>
        </>
    )
}

export default BeforeHomework
