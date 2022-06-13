import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import logoText from "../../assets/images/logo-text.svg";

const Styled = styled.div`
  max-width: 100%;
  height: auto;

  .brand-link {
    display: inline-flex;
    align-items: center;

    .brand-text {
      margin-left: 13px;
      display: inline-block;
      margin-top: 4px;
    }
  }
`;

const Brand = ({url = '/', mini = false, ...rest}) => {
    return (
        <Styled {...rest}>
            <NavLink to={url} className={'brand-link'}>
                <img src={logo} alt="logo"/>
                {!mini && <img className={'brand-text'} src={logoText} alt="logo text"/>}
            </NavLink>
        </Styled>
    );
};

export default Brand;