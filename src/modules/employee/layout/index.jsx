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
  position: relative;
  .sticky{
    position: sticky;
    top: 0;
  }

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
            <div className="layout__left sticky">
                <Sidebar data={get(data, 'data.data', {})}/>
            </div>
            <div className="layout__right">
                <Outlet/>
            </div>
        </Styled>
    );
};

export default EmployeeLayout;