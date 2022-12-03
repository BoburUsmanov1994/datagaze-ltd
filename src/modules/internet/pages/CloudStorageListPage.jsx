import React from 'react';
import VisitsListContainer from "../containers/VisitsListContainer";
import {useParams} from "react-router-dom";
import CloudStorageListContainer from "../containers/CloudStorageListContainer";

const CloudStorageListPage = ({
                                  ...rest
                              }) => {
    const {id} = useParams()
    return (
        <>
            <CloudStorageListContainer id={id}/>
        </>
    );
};

export default CloudStorageListPage;