import React from 'react';
import "../css/VideosCSS/files.css";
import DocumentContainer from './DocumentContainer';
import { useGlobalContext } from '../context/context';
import { AiOutlineSearch } from "react-icons/ai";

const Files = () => {
    const { bgColor, singleLesson } = useGlobalContext();
    const files = singleLesson?.files || [];

    const filesObjArr = files.map((file, index) => ({
        id: index + 1,
        file,
    }));

    return (
        <>
            <div className='files-title'>
                <h1 className={bgColor ? 'white' : 'black'}>Files</h1>
            </div>
            {files.length ? (
                filesObjArr.map((document, index) => {
                    return (
                        <DocumentContainer key={index} {...document} index={index} />
                    )
                })
            ) : (
                <div>
                    <div className={bgColor ? 'no-files-search-black' : "no-files-search-white"}>
                        <AiOutlineSearch fontSize={40} />
                    </div>
                    <div className={bgColor ? 'no-files-black' : 'no-files-white'}>
                        <h3>There is not Files Yet</h3>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Files
