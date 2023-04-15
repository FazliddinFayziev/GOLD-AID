import React from 'react';
import { useGlobalContext } from '../context/context';
import "../css/VideosCSS/files.css";
import DocumentContainer from './DocumentContainer';
import { DonwloadDocument } from '../Data/data';

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
