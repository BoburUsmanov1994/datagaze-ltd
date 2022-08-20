import React from 'react';
import styled from "styled-components";
import Avatar from "../../../components/avatar";
import {Briefcase} from "react-feather";
import Menu from "./menu";

const Styled = styled.div`
  min-height: 100vh;
  border-right: 1px solid #CDCDCD;

  .sidebar {
    &__profile {
      padding: 25px 30px;
      text-align: center;

      .avatar {
        margin: 0 auto;
      }

      &__title {
        margin-top: 15px;
        font-weight: 500;
        color: #000;
        font-size: 20px;
        margin-bottom: 8px;
      }

      &__job {
        font-weight: 400;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          margin-right: 5px;
          margin-bottom: 1px;
        }
      }
    }

    &__menu {
      padding-top: 15px;
    }
  }
`;
const Sidebar = ({
                     ...rest
                 }) => {
    return (
        <Styled {...rest}>
            <div className="sidebar__profile">
                <Avatar className={"avatar"}/>
                <h2 className={'sidebar__profile__title'}>Turapov Avazbek</h2>
                <p className={'sidebar__profile__job'}><Briefcase size={18}/> <span>Начальние отдела</span></p>
            </div>
            <div className="sidebar__menu">
                <Menu/>
            </div>
        </Styled>
    );
};

export default Sidebar;