import React from 'react';
import KeyloggerListContainer from "../containers/KeyloggerListContainer";
import {useParams} from "react-router-dom";

const KeyloggerListPage = ({
                               ...rest
                           }) => {
    const {id} = useParams()
    return (
        <>
            <KeyloggerListContainer id={id}/>
        </>
    );
};

export default KeyloggerListPage;