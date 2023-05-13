import React from 'react';
import {get} from "lodash";
import {useSettingsStore, useStore} from "../../store";

const useAuth = ({...rest}) => {
    const user = useStore(state => get(state, 'user', null))
    const isAuthenticated = useStore(state => get(state, 'isAuthenticated', false))
    const token = useSettingsStore(state => get(state, 'tokenData', null))
    console.log('token', token)
    return {
        user,
        isAuthenticated,
        token
    }
};

export default useAuth;