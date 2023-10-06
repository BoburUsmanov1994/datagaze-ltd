import React from 'react';
import TelegramListContainer from "../containers/TelegramListContainer";
import {useParams} from "react-router-dom";

const TelegramListPage = () => {
    const {id} = useParams()
    return (
        <>
            <TelegramListContainer id={id}/>
        </>
    );
};

export default TelegramListPage;