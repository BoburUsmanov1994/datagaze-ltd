import React from 'react';
import EmployeeContainer from "../containers/EmployeeContainer";
import {useParams} from "react-router-dom";

const EmployeePage = ({
                                 ...rest
                             }) => {
    const {id} = useParams()
    return (
        <>
            <EmployeeContainer id={id}/>
        </>
    );
};

export default EmployeePage;