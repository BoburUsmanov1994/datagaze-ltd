import React, {useEffect,memo} from 'react';
import {useGetAllQuery} from "../../hooks/api";
import {OverlayLoader} from "../../components/loader";
import {KEYS} from "../../constants/key";
import {URLS} from "../../constants/url";
import {useSettingsStore, useStore} from "../../store";
import {get, isNil} from "lodash";

const Auth = ({children, ...rest}) => {
    const {data:profile,isLoading} = useGetAllQuery({key:KEYS.profile,url:URLS.profile,hideErrorMsg:true})
    const setUser = useStore(state => get(state,'setUser',()=>{}))
    const setToken = useSettingsStore(state => get(state,'setToken',()=>{}))

    useEffect(()=>{
        if(!isNil(get(profile,'data'))){
            setUser(get(profile,'data'));
            setToken(get(profile,'data.token'));
        }
    },[get(profile,'data')])
    if(isLoading){
        return <OverlayLoader />
    }
    return (
        <>
            {children}
        </>
    );
};

export default memo(Auth);