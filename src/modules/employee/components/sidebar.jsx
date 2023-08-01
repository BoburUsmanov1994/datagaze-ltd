import React from 'react';
import styled from "styled-components";
import Avatar from "../../../components/avatar";
import {Briefcase} from "react-feather";
import Menu from "./menu";
import {get, head, isEmpty} from "lodash"
import {useStore} from "../../../store";
import {useGetAllQuery, useGetOneQuery} from "../../../hooks/api";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {OverlayLoader} from "../../../components/loader";

const Styled = styled.div`
  min-height: 100vh;
  border-right: 1px solid #CDCDCD;

  .sidebar {
    &__profile {
      padding: 25px 30px;
      text-align: center;

      &_info {
        margin-top: 15px;
        text-align: left;

        li {
          margin-top: 8px;

          strong {
            margin-right: 16px;
          }
        }
      }

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
                     data = {},
                     id = null,
                     ...rest
                 }) => {
    const dateRange = useStore(state => get(state, 'dateRange', null))
    const {data:counts, isLoading} = useGetAllQuery({
        key: KEYS.dataCount,
        url: URLS.dataCount,
        params: {
            employeeId :id,
            start:get(dateRange,'startDate'),
            end:get(dateRange,'endDate'),
        },
        enabled: !!(id && !isEmpty(dateRange))
    })
    if(isLoading){
        return <OverlayLoader />
    }
    console.log('counts',counts)
    return (
        <Styled {...rest}>
            <div className="sidebar__profile">
                <Avatar bordered className={"avatar"} isOnline={get(data, 'isOnline', false)}/>
                <h2 className={'sidebar__profile__title'}>{get(data, 'lastName')} {get(data, 'firstName')}</h2>
                {get(data, 'position') &&
                    <p className={'sidebar__profile__job'}><Briefcase size={18}/> <span>{get(data, 'position')}</span>
                    </p>}
                <ul className={'sidebar__profile_info'}>
                    <li><strong>IP:</strong></li>
                    <li><strong>MAC:</strong></li>
                    <li><strong>E-mail:</strong></li>
                </ul>
            </div>
            <div className="sidebar__menu">
                <Menu counts={head(get(counts,'data.data.result',[]))}/>
            </div>
        </Styled>
    );
};

export default Sidebar;