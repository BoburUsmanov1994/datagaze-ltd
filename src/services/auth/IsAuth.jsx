import React from 'react';
import useAuth from "../../hooks/auth/useAuth";

const IsAuth = ({children}) => {
    const {isAuthenticated = false} = useAuth({});
    return isAuthenticated ? children : null
};

export default IsAuth;