import React from 'react';
import { GiLaptop } from "react-icons/gi";

const NotAvailable = () => {
    return (
        <div className="not-available-found">
            <div className="not-available-container">
                <h1 className="not-available-heading"><GiLaptop /></h1>
                <p className="not-available-subheading"><span className='not-available'>Not Available</span> on the small screens</p>
                <p className="not-available-subheading">Please use <span className='not-available'>Bigger screen</span></p>
            </div>
        </div>
    )
}

export default NotAvailable


