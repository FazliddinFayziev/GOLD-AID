import React from 'react'
import { useGlobalContext } from '../context/context'

const Verify = () => {
    const { msg } = useGlobalContext();
    return (
        <div className="page-verify">
            <div className="verify-container">
                <h1 className="verify-heading">VERIFY EMAIL</h1>
                <p className="verify-subheading">{msg}</p>
                <a href="https://mail.google.com/mail/u/0/?ogbl#inbox" className="verify-button">Verify</a>
            </div>
        </div>
    )
}

export default Verify
