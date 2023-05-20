import React from 'react';
import "../../css/AdminCSS/quotes.css";
import UploadQuotes from '../UploadQuotes';
import AllQuotes from '../AllQuotes';

const Quotes = () => {
    return (
        <>
            <div className='admin-quotes'>
                <div className='start-quotes'>
                    Courses
                </div>
                <UploadQuotes />
                <AllQuotes />
            </div>
        </>
    )
}

export default Quotes