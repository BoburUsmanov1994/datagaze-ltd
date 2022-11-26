import React from 'react';
import ComputersListContainer from "../containers/ComputersListContainer";

const ComputersListPage = ({
                               ...rest
                           }) => {
    return (
        <>
            <ComputersListContainer/>
        </>
    );
};

export default ComputersListPage;