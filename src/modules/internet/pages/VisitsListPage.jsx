import React from 'react';
import VisitsListContainer from "../containers/VisitsListContainer";
import {useParams} from "react-router-dom";

const VisitsListPage = ({
                            ...rest
                        }) => {
    const {id} = useParams()
    return (
        <>
            <VisitsListContainer id={id}/>
        </>
    );
};

export default VisitsListPage;