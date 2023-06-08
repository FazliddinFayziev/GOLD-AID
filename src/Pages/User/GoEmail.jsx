import React from 'react';
import { useGlobalContext } from '../../context/context';
import { AiOutlineMail } from "react-icons/ai";

const GoEmail = () => {
    const { msg } = useGlobalContext();
    return (
        <div className="page-verify">
            <div className="verify-container">
                <h1 className="verify-heading">Go Email</h1>
                <p className="verify-subheading">{msg}</p>
                <AiOutlineMail fontSize={80} />
            </div>
        </div>
    )
}

export default GoEmail