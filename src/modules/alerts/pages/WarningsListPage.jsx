import React from 'react';
import {useParams} from "react-router-dom";
import WarningsListContainer from "../containers/WarningsListContainer";

const WarningsListPage = ({
                              ...rest
                          }) => {
    const {id} = useParams()
    return (
        <>
            <WarningsListContainer id={id}/>
        </>
    );
};

export default WarningsListPage;