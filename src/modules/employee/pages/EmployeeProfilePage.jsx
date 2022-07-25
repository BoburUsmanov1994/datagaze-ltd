import React from 'react';
import EmployeeProfileContainer from "../containers/EmployeeProfileContainer";

const EmployeeProfilePage = ({
                                 ...rest
                             }) => {
    return (
        <>
            <EmployeeProfileContainer/>
        </>
    );
};

export default EmployeeProfilePage;