import React from 'react';
import VisitsListContainer from "../containers/VisitsListContainer";
import {useParams} from "react-router-dom";
import CloudStorageListContainer from "../containers/CloudStorageListContainer";
import HttpListContainer from "../containers/HttpListContainer";

const HttpListPage = ({
                                  ...rest
                              }) => {
    const {id} = useParams()
    return (
        <>
            <HttpListContainer id={id}/>
        </>
    );
};

export default HttpListPage;