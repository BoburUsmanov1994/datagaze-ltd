import React from 'react';
import {useParams} from "react-router-dom";
import UsbFileListContainer from "../containers/UsbFileListContainer";

const UsbFileListPage = ({}) => {
    const {id} = useParams()
    return (
        <>
            <UsbFileListContainer id={id}/>
        </>
    );
};

export default UsbFileListPage;