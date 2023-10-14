import React from 'react';
import {useParams} from "react-router-dom";
import UsbDevicesListContainer from "../containers/UsbDevicesListContainer";

const UsbDevicesListPage = ({}) => {
    const {id} = useParams()
    return (
        <>
            <UsbDevicesListContainer id={id}/>
        </>
    );
};

export default UsbDevicesListPage;