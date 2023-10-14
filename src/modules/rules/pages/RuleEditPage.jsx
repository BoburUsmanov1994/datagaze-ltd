import React from 'react';
import RuleEditContainer from "../containers/RuleEditContainer";
import {useParams} from "react-router-dom";

const RuleEditPage = () => {
    const {id} = useParams();
    return (
        <>
            <RuleEditContainer id={id}/>
        </>
    );
};

export default RuleEditPage;