import React from 'react';
import { VscFileSubmodule } from "react-icons/vsc";
import { BsDownload } from "react-icons/bs";

const EditFiles = ({ Url }) => {
    return (
        <div className='files-edit-box'>
            <div className='file-edit-icon'>
                <VscFileSubmodule fontSize={30} />
            </div>
            <div className='file-edit-title'>
                <p>Document</p>
            </div>
            <a href={Url} download="Golden-Aid" className='file-edit-dowload'>
                <BsDownload fontSize={30} />
            </a>
        </div>
    )
}

export default EditFiles