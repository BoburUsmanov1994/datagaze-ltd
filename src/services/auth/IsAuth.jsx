import React from 'react';
import useAuth from "../../hooks/auth/useAuth";

const IsAuth = ({children,...rest}) => {
    const {isAuthenticated,token = null} = useAuth({});

    return !!(token) ? children : null
};

export default IsAuth;