import React from 'react';
import styled from "styled-components";
import Menu from "../menu";
import miniLogo from '../../assets/images/mini-logo.svg'
import {Link} from "react-router-dom";
import {LogOut} from "react-feather";

const Styled = styled.aside`
  position: fixed;
  width: 60px;
  height: 100vh;
  border-right: 1px solid #CDCDCD;
  background-color: #fff;
  overflow-x: hidden;
  padding-top: 20px;
  padding-bottom: 15px;
  overflow-y: auto;
  .miniLogo{
    display: block;
    text-align: center;
    margin-bottom: 15px;
  }
  .logout{
    position: absolute;
    width: 100%;
    height:50px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const Sidebar = ({children,...rest}) => {
    return (
        <Styled {...rest}>
            <Link className={'miniLogo'} to={'/dashboard'}>
                <img src={miniLogo} alt="mini logo"/>
            </Link>
            <Menu />
            <div className="logout">
                <LogOut  color={'#948989'} size={22}/>
            </div>
        </Styled>
    );
};

export default Sidebar;