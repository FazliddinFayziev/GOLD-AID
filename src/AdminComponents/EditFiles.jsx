import React from 'react';
import { VscFileSubmodule } from "react-icons/vsc";
import { BsDownload } from "react-icons/bs";
import { useGlobalContext } from '../context/context';

const EditFiles = () => {
    const { singleAdminLesson, setSingleAdminLesson } = useGlobalContext();
    return (
        <>
            <div key={''} className='files-edit-container-box'>

                <div className='files-edit-box'>
                    <div className='file-edit-icon'>
                        <VscFileSubmodule fontSize={30} />
                    </div>
                    <div className='file-edit-title'>
                        <p>Document</p>
                    </div>
                    <a href={''} download="Golden-Aid" className='file-edit-dowload'>
                        <BsDownload fontSize={30} />
                    </a>
                </div>

            </div>
        </>
    )
}

export default EditFiles