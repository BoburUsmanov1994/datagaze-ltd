import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../../components/header";

import styled from "styled-components";
import Sidebar from "../../components/sidebar";
import Content from "../../components/content";

const Styled = styled.div`
  position: relative;
  .wrap-content{
    display: flex;
  }
`;
const MainLayout = ({...rest}) => {

    return (
        <Styled {...rest}>
            <div className={'wrap-content'}>
                <Sidebar />
                <Content>
                    {/*<Header />*/}
                    <Outlet/>
                </Content>
            </div>
        </Styled>
    );
};

export default MainLayout;