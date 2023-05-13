import React from 'react';
import {useGetAllQuery} from "../../hooks/api";
import {OverlayLoader} from "../../components/loader";
import {KEYS} from "../../constants/key";
import {URLS} from "../../constants/url";
import {useSettingsStore, useStore} from "../../store";
import {get, isNil} from "lodash";

const Auth = ({children}) => {
    const token = useSettingsStore(state => get(state, 'token', null))
    const setAuth = useStore(state => get(state, 'setAuth', () => {
    }))
    const setUser = useStore(state => get(state, 'setUser', () => {
    }))
    const {data: profile, isLoading} = useGetAllQuery({
        key: KEYS.profile,
        url: URLS.profile,
        hideErrorMsg: true,
        enabled: !isNil(token),
        cb: {
            success: ({data: response}) => {
                setUser(response);
                setAuth(true);
            },
            fail: () => {
            },
        },
    })


    if (isLoading) {
        return <OverlayLoader/>
    }
    return children;
};

export default Auth;