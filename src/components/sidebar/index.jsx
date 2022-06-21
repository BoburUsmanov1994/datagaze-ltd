import React from 'react';
import styled from "styled-components";
import Menu from "../menu";
import miniLogo from '../../assets/images/mini-logo.svg'
import {Link} from "react-router-dom";

const Styled = styled.aside`
  position: fixed;
  width: 60px;
  height: 100vh;
  border-right: 1px solid #707070;
  background-color: #fff;
  overflow-x: hidden;
  padding-top: 20px;
  padding-bottom: 15px;
  overflow-y: auto;
  .miniLogo{
    display: block;
    text-align: center;
  }
`;

const Sidebar = ({children,...rest}) => {
    return (
        <Styled {...rest}>
            <Link className={'miniLogo'} to={'/dashboard'}>
                <img src={miniLogo} alt="mini logo"/>
            </Link>
            <Menu />
        </Styled>
    );
};

export default Sidebar;