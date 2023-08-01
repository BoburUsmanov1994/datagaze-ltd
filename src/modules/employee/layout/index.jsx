import React from 'react';
import styled from "styled-components";
import Sidebar from "../components/sidebar";
import {Outlet, useParams} from "react-router-dom";
import {useGetAllQuery, useGetOneQuery} from "../../../hooks/api";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {OverlayLoader} from "../../../components/loader";
import {get, isEmpty} from "lodash"
import {useStore} from "../../../store";

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
    const dateRange = useStore(state => get(state, 'dateRange', null))
    const {data, isLoading} = useGetOneQuery({
        id,
        key: KEYS.employee,
        url: URLS.employee,
        params: {
            id
        },
        enabled: !!(id)
    })
    if (isLoading) {
        return <OverlayLoader/>
    }

    return (
        <Styled {...rest}>
            <div className="layout__left">
                <Sidebar id={id} data={get(data, 'data.data', {})}/>
            </div>
            <div className="layout__right">
                <Outlet/>
            </div>
        </Styled>
    );
};

export default EmployeeLayout;