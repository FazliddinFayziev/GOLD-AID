import React from 'react'

const UploadQuotes = () => {
    return (
        <>
            <div className='upload-quotes'>
                <h4>Upload Quote</h4>
                <div className='upload-quote-container-box'>
                    <div className='upload-quote-box'>
                        <div className='upload-quotes-container'>
                            <h3>Quote:</h3>
                            <input type="text" placeholder='Quote...' />
                        </div>
                        <div className='upload-quotes-container'>
                            <h3>Author:</h3>
                            <input type="text" placeholder='Author...' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadQuotes