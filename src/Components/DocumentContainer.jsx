import React from 'react';
import { click } from '../assets';
import { document } from '../assets';

const DocumentContainer = ({ documentLink, lesson, id }) => {
    return (
        <div key={id} className='file-container'>
            <a href={documentLink} download={lesson}>
                <div className='file-img-container'>
                    <div className='file-document-img'>
                        <img src={document} alt="document-gold-aid" />
                    </div>
                    <h1>Download</h1>
                    <div className='file-click-img'>
                        <img src={click} alt="click-gold-aid" />
                    </div>
                </div>
            </a>
        </div>
    )
}

export default DocumentContainer
