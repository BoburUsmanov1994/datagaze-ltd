import React, {useEffect} from 'react';
import {useGetAllQuery} from "../../hooks/api";
import {OverlayLoader} from "../../components/loader";
import {KEYS} from "../../constants/key";
import {URLS} from "../../constants/url";
import {useStore} from "../../store";
import {get, isNil} from "lodash";

const Auth = ({children, ...rest}) => {
    const {data:profile,isLoading} = useGetAllQuery({key:KEYS.profile,url:URLS.profile,hideErrorMsg:true})
    const setAuth = useStore(state => get(state,'setAuth',()=>{}))
    const setUser = useStore(state => get(state,'setUser',()=>{}))



    useEffect(()=>{
        if(!isNil(get(profile,'data'))){
            setUser(get(profile,'data'));
            setAuth(true);
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

export default Auth;