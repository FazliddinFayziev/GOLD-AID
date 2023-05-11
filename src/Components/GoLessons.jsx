import React from 'react'
import { IoIosArrowBack } from "react-icons/io"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const GoLessons = () => {
    const { level } = useParams();
    return (
        <Link to={`/user/${level}`}>
            <div className='roll-back'>
                <IoIosArrowBack fontSize={20} />
            </div>
        </Link>

    )
}

export default GoLessons
