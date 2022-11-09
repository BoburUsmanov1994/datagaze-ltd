import React from 'react';
import useAuth from "../../hooks/auth/useAuth";

const IsGuest = ({children}) => {
    const {isAuthenticated = false, token = null} = useAuth({});

    return !isAuthenticated && !token ? children : null

};

export default IsGuest;