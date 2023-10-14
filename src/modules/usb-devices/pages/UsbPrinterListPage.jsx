import React from 'react';
import {useParams} from "react-router-dom";

const UsbPrinterListPage = ({}) => {
    const {id} = useParams()
    return (
        <>
            <UsbPrinterListPage id={id}/>
        </>
    );
};

export default UsbPrinterListPage;