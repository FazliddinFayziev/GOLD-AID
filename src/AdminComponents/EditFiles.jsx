import React from 'react';
import { VscFileSubmodule } from "react-icons/vsc";
import { BsDownload } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

const EditFiles = ({ Url, index, Key, handleDeleteSingleFile }) => {
    return (
        <>
            <div>
                <div className='files-edit-box'>
                    <div className='file-edit-icon'>
                        <VscFileSubmodule fontSize={30} />
                    </div>
                    <div className='file-edit-title'>
                        <p>Document_{index + 1}</p>
                    </div>
                    <a href={Url} download="Golden-Aid" className='file-edit-dowload'>
                        <BsDownload fontSize={30} />
                    </a>
                </div>
                <div className='delete-file-container'>
                    <div onClick={() => handleDeleteSingleFile(Key)} className='delete-file'><AiFillDelete fontSize={20} /></div>
                </div>
            </div>
        </>
    )
}

export default EditFiles