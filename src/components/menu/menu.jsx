import React, {memo} from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {
    File,
    Globe,
    Grid,
    Monitor,
    Settings,
    Shield,
    Users
} from "react-feather";
import {useTranslation} from "react-i18next";
import {useSettingsStore} from "../../store";
import {get} from "lodash";


const StyledMenu = styled.div`
  position: relative;

  ul {
    padding: 15px 15px 5px;
    height: calc(100vh - 120px);
    overflow-y: auto;

    li {
      margin-bottom: 30px;
      text-align: ${({isMenuOpen}) => isMenuOpen ? 'left' : 'center'};

      a {
        color: #948989;
        transition: 0.3s ease;
        display: flex;
        align-items: center;

        &:hover {
          color: #18181B;
        }

        &.active {
          color: #4439C1;
          .menu__text{
           font-weight: 500;
            color: #4439C1;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .menu__text {
    color: #000;
    margin-left: 15px;
    font-size: 16px;
    display: ${({isMenuOpen}) => isMenuOpen ? 'inline-block' : 'none'};
  }
`;

const Menu = ({...rest}) => {
    const {t} = useTranslation();
    const isMenuOpen = useSettingsStore(state => get(state, 'isMenuOpen', true))
    return (
        <StyledMenu isMenuOpen={!isMenuOpen} {...rest}>
            <ul>
                <li>
                    <NavLink to={"/dashboard"}>
                        <Grid size={24}/> <span className={'menu__text'}>{t("Dashboard")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/employee"}>
                        <Users size={24}/> <span className={'menu__text'}>{t("Employees")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/computers"}>
                        <Monitor size={24}/><span className={'menu__text'}>{t("Computers")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/incidents"}>
                        <Shield size={24}/><span className={'menu__text'}>{t("Incidents")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/groups"}>
                        <Users size={24}/><span className={'menu__text'}>{t("Groups")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/documents"}>
                        <File size={24}/><span className={'menu__text'}>{t("Documents")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/rules"}>
                        <Settings size={24}/><span className={'menu__text'}>{t("Rules")}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/translations"}>
                        <Globe size={24}/><span className={'menu__text'}>{t("Translations")}</span>
                    </NavLink>
                </li>
            </ul>
        </StyledMenu>
    );
};

export default memo(Menu);