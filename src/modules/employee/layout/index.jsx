import React from 'react';
import styled from "styled-components";
import Sidebar from "../components/sidebar";
import {Outlet} from "react-router-dom";

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
    return (
        <Styled {...rest}>
            <div className="layout__left">
                <Sidebar/>
            </div>
            <div className="layout__right">
                <Outlet />
            </div>
        </Styled>
    );
};

export default EmployeeLayout;