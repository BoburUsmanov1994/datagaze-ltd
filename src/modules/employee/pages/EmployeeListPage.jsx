import React from 'react';
import EmployeeListContainer from "../containers/EmployeeListContainer";

const EmployeeListPage = ({
                              ...rest
                          }) => {
    return (
        <>
            <EmployeeListContainer/>
        </>
    );
};

export default EmployeeListPage;