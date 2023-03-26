import React from 'react';
import { warning_img } from '../assets';
import { useGlobalContext } from '../context/context';
import Inputs from '../Data/Inputs';

const WarningPage = () => {
    const { languageBoolean } = useGlobalContext();
    const { ru, eng } = languageBoolean
    return (
        <div>
            <div className='warning-text-center'>
                {
                    eng ? (
                        <h1>Before start, we should know your <span className="text-level">Level</span></h1>
                    ) : ru ? (
                        <h1>Перед стартом, мы должны знать ваш <span className="text-level">Уровень</span></h1>
                    ) : (
                        <h1>Boshlashdan oldin, biz sizning <span className="text-level">Darajangizni</span> bilishimiz kerak</h1>)
                }
            </div>
            <div className='warning-text-center'>
                {
                    eng ? (
                        <p className='warning-page-text'>
                            You will be given only one chance to take the test. Thanks to test, we will know your level. <span className='red-text'>Please be responsible for your test, because according to your test results, you will get your courses !</span>
                        </p>
                    ) : ru ? (
                        <p className='warning-page-text'>
                            Вам будет предоставлена ​​только одна возможность пройти тест. Благодаря тесту мы узнаем ваш уровень. <span className='red-text'>Пожалуйста, будьте ответственны за свой тест, потому что по результатам теста вы получите свои курсы !</span>
                        </p>
                    ) : (
                        <p className='warning-page-text'>
                            Sinovdan o'tish uchun sizga faqat bitta imkoniyat beriladi. Sinov orqali biz sizning darajangizni bilib olamiz. <span className='red-text'>Iltimos, testga mas'uliyat bilan yondashing, chunki test natijalari sizni qaysi kursda bo'lishingizni belgilab beradi!</span>
                        </p>
                    )
                }
            </div>
            <div className='warning-img'>
                <div className='warning-img-container'>
                    <img src={warning_img} alt="" />
                </div>
            </div>
            <div className='button-container'>
                <div className='warning-button-container'>
                    <button
                        className='warning-button'
                    >
                        {Inputs(eng, ru).StartTest}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WarningPage
