import React, {memo} from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import Icon from "../ui/icon";

const StyledMenu = styled.div`
  ul {
    padding: 50px 20px;

    li {
      margin-bottom: 30px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const Menu = ({...rest}) => {
    return (
        <StyledMenu {...rest}>
            <ul>
                <li>
                    <NavLink to={"/dashboard"}>
                        <Icon icon={'dashboard'} size={20}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/users"}>
                        <Icon icon={'user-group'} size={20}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/statistics"}>
                        <Icon icon={'monitor'} size={20}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/user"}>
                        <Icon icon={'user'} size={20}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/shield-check"}>
                        <Icon icon={'shield-check'} size={20} />
                    </NavLink>
                </li>
            </ul>
        </StyledMenu>
    );
};

export default memo(Menu);