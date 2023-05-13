import React from 'react';
import styled from "styled-components";
import Sidebar from "../components/sidebar";
import {Navigate, Outlet, useParams} from "react-router-dom";
import {useGetOneQuery} from "../../../hooks/api";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {OverlayLoader} from "../../../components/loader";
import {get} from "lodash"

const Styled = styled.div`
  display: flex;
  width: 100%;

  .layout {
    &__left {
      width: 300px;
    }

    &__right {
      width: calc(100% - 300px);
    }
  }
`;
const EmployeeLayout = ({
                            ...rest
                        }) => {
    const {id} = useParams();
    const {data,isLoading,isError} = useGetOneQuery({
        id,
        key:KEYS.employees,
        url:URLS.employees,
        params:{

        },
        enabled:false
    })
    if(isError){
        return <Navigate to={'/error'} />
    }
    if(isLoading){
        return  <OverlayLoader />
    }
    return (
        <Styled {...rest}>
            <div className="layout__left">
                <Sidebar data={get(data,'data',{})}/>
            </div>
            <div className="layout__right">
                <Outlet />
            </div>
        </Styled>
    );
};

export default EmployeeLayout;