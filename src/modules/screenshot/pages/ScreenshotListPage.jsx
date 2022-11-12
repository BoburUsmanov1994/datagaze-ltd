import React from 'react';
import {useParams} from "react-router-dom";
import ScreenshotListContainer from "../containers/ScreenshotListContainer";

const ScreenshotListPage = ({
                                ...rest
                            }) => {
    const {id} = useParams();
    return (
        <>
            <ScreenshotListContainer id={id}/>
        </>
    );
};

export default ScreenshotListPage;