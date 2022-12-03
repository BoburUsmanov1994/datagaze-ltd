import React from 'react';
import IncidentsListContainer from "../containers/IncidentsListContainer";

const IncidentListPage = ({
                              ...rest
                          }) => {
    return (
        <>
            <IncidentsListContainer/>
        </>
    );
};

export default IncidentListPage;