import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../../components/header";

import styled from "styled-components";
import Sidebar from "../../components/sidebar";
import Content from "../../components/content";
import Footer from "../../components/footer";

const Styled = styled.div`
  position: relative;
  .wrap-box{
    display: flex;
  }
`;
const MainLayout = ({...rest}) => {

    return (
        <Styled {...rest}>
            <div className={'wrap-box'}>
                <Sidebar />
                <Content>
                    <Header />
                    <div className={'wrap-content'}>
                        <Outlet/>
                    </div>
                    <Footer />
                </Content>
            </div>
        </Styled>
    );
};

export default MainLayout;