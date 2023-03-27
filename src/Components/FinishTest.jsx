import React from 'react';

function FinishTest({ score, scoreReading, level }) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className='flex justify-center my-3'>
                    <h1 className='font-serif font-semibold text-xl'><p className='welcome'>Thank you dear Student</p></h1>
                </div>
                <p>Your score from Grammar and Vocabulary: <span className='text-xl font-serif font-semibold text-blue-600'>{score} out of 50</span></p>
                <p>Your score from Reading: <span className='text-xl font-serif font-semibold text-blue-600'>{scoreReading} out 0f 10</span></p>
                <p>Your level:  <span className='text-xl font-serif font-semibold text-blue-600'>{level}</span></p>
            </div>
        </div>
    );
}

export default FinishTest;
