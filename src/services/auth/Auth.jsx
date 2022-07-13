import React from 'react';
import {useGetAllQuery} from "../../hooks/api";
import {OverlayLoader} from "../../components/loader";
import {KEYS} from "../../constants/key";
import {URLS} from "../../constants/url";

const Auth = ({children, ...rest}) => {
    const {data = null,isLoading} = useGetAllQuery({key:KEYS.profile,url:URLS.profile,hideErrorMsg:true})
    console.log(data)
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