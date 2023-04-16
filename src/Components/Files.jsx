import React from 'react';
import "../css/VideosCSS/files.css";
import { DonwloadDocument } from '../Data/data';
import DocumentContainer from './DocumentContainer';
import { useGlobalContext } from '../context/context';

const Files = () => {
    const { bgColor } = useGlobalContext();
    return (
        <>
            <div className='files-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Files</h1>
            </div>
            {
                DonwloadDocument.map((document, index) => {
                    return (
                        <DocumentContainer key={index} {...document} />
                    )
                })
            }
        </>
    )
}

export default Files
