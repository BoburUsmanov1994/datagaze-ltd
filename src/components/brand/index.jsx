import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo.svg";

const Styled = styled.div`
  max-width: 100%;
  height: auto;

  .brand-link {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Brand = ({url = '/', mini = false, ...rest}) => {
    return (
        <Styled {...rest}>
            <NavLink to={url} className={'brand-link'}>
                <img width={190} src={logo} alt="logo"/>
            </NavLink>
        </Styled>
    );
};

export default Brand;