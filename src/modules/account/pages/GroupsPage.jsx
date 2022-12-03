import React from 'react';
import AccountsContainer from "../containers/AccountsContainer";
import GroupsContainer from "../containers/GroupsContainer";

const GroupsPage = ({
                        ...rest
                    }) => {
    return (
        <>
            <GroupsContainer/>
        </>
    );
};

export default GroupsPage;