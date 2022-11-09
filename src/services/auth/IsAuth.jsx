import React from 'react';
import useAuth from "../../hooks/auth/useAuth";

const IsAuth = ({children}) => {
    const {isAuthenticated = false,token = null} = useAuth({});

    return isAuthenticated && token ? children : null
};

export default IsAuth;