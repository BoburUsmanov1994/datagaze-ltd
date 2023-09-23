import React, {memo} from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {
    Clipboard,
    Copy,
    Database, File,
    Globe,
    Grid,
    Monitor,
    PieChart,
    Search,
    Server,
    Settings,
    Shield,
    User,
    Users
} from "react-feather";

const StyledMenu = styled.div`
  position: relative;

  ul {
    padding: 15px 15px 5px;
    height: calc(100vh - 120px);
    overflow-y: auto;

    li {
      margin-bottom: 20px;
      text-align: center;

      a {
        color: #948989;
        transition: 0.3s ease;

        &:hover {
          color: #18181B;
        }

        &.active {
          color: #4439C1;
        }
      }

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
                        <Grid size={21}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/employee"}>
                        <Users size={20}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/computers"}>
                        <Monitor size={20}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/incidents"}>
                        <Shield size={20}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/groups"}>
                        <Users size={20}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/documents"}>
                        <File size={20}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/rules"}>
                        <Settings size={20}/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/translations"}>
                        <Globe size={20}/>
                    </NavLink>
                </li>
            </ul>
        </StyledMenu>
    );
};

export default memo(Menu);