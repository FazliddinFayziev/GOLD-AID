import React from 'react';
import { ImQuotesLeft } from "react-icons/im";

const AllQuotes = ({ author, quote }) => {
    return (
        <>

            <div>
                <div className='all-quotes-cards'>
                    <div className='all-quotes-back'></div>
                    <div className='brakets'>
                        <ImQuotesLeft fontSize={30} />
                    </div>
                    <div className='all-quotes'>
                        <p>{quote}</p>
                    </div>
                    <div className='author'>
                        {author}
                    </div>
                </div>
            </div>

        </>
    )
}

export default AllQuotes