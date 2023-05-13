import React from 'react';
import styled from "styled-components";
import {User, ChevronDown} from "react-feather";
import config from "../../config";
import {useStore} from "../../store";
import {get} from "lodash";

const Styled = styled.div`
  border: 1px solid #C2C2C2;
  padding: 5px 15px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  max-width: 250px;
  display: flex;
  align-items: center;


  .username {
    font-size: 15px;
    display: inline-block;
    margin-right: 8px;
    margin-top: 3px;
    max-width: 175px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-icon {
    margin-right: 12px;
    line-height: 1;
  }

  .profile__avatar {
    width: 32px;
    height: 32px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 18px;
  }

  .chevron-icon {
    margin-top: 3px;
  }
`

const Profile = ({
                     avatar = null,
                     username = 'Admin',
                     ...rest
                 }) => {
    const user = useStore(state => get(state, 'user', null))
    return (
        <Styled {...rest}>
            {avatar ? <img className={'profile__avatar'} src={`${config.API_ROOT}${avatar}`} alt=""/> :
                <User className={'user-icon'} size={26} color={'#9B9B9B'}/>}
            <span className={'username'}>{get(user, 'username')}</span>
            <ChevronDown className={'chevron-icon'} size={20} color={'#9B9B9B'}/>
        </Styled>
    );
};

export default Profile;