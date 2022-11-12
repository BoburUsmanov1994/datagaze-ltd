import React from 'react';
import BufferListContainer from "../containers/BufferListContainer";
import {useParams} from "react-router-dom";

const BufferListPage = ({}) => {
    const {id} = useParams()
    return (
        <>
            <BufferListContainer id={id}/>
        </>
    );
};

export default BufferListPage;