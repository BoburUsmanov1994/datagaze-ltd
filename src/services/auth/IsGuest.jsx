import React from 'react';
import useAuth from "../../hooks/auth/useAuth";

const IsGuest = ({children}) => {
    const {isAuthenticated = false} = useAuth({});
    return !isAuthenticated ? children : null

};

export default IsGuest;