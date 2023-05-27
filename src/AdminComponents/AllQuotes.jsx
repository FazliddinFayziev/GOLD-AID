import React from 'react';
import { ImQuotesLeft } from "react-icons/im";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const AllQuotes = ({ author, quote, _id, setGetIdOfQuote, setShowCard, setShowEditCard }) => {

    return (
        <>

            <div>
                <div className='all-quotes-cards'>
                    <div className='all-quotes-back'></div>
                    <div className='brakets'>
                        <ImQuotesLeft fontSize={30} />
                    </div>
                    <div className={quote.length < 100 ? 'all-quotes' : 'all-quotes-short'}>
                        <p>{quote}</p>
                    </div>
                    <div className='author'>
                        {author}
                    </div>

                    {/* DELETE QUOTE */}

                    <div onClick={() => {
                        setShowCard(true);
                        setGetIdOfQuote(_id)
                    }} className='delete-quote'>
                        <AiOutlineDelete fontSize={30} />
                    </div>

                    <div
                        onClick={() => {
                            setShowEditCard(true);
                            setGetIdOfQuote(_id)
                        }}
                        className='edit-quote'>
                        <FiEdit fontSize={30} />
                    </div>

                </div>
            </div>

        </>
    )
}

export default AllQuotes