import React from 'react';
import useAuth from "../../hooks/auth/useAuth";
import {isNil} from "lodash";

const IsGuest = ({children}) => {
    const {isAuthenticated = false, token = null} = useAuth({});

    return !isAuthenticated && isNil(token) ? children : null

};

export default IsGuest;