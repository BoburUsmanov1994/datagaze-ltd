import React from 'react';
import styled from "styled-components";
import {User, ChevronDown} from "react-feather";
import config from "../../config";
import {useStore} from "../../store";
import {get} from "lodash";
import avatarImg from "../../assets/icons/admin.png"

const Styled = styled.div`
  border: 1px solid #C2C2C2;
  padding: 6px 18px;
  padding-left: 8px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  max-width: 250px;
  min-width: 150px;
  display: flex;
  align-items: center;


  .username {
    font-size: 16px;
    display: inline-block;
    margin-right: 8px;
    max-width: 175px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-icon {
    margin-right: 10px;
    line-height: 1;
  }

  .profile__avatar {
    width: 36px;
    height: 36px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 12px;
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
                <img className={'profile__avatar'} src={avatarImg} alt=""/>}
            <span className={'username'}>{get(user, 'username')}</span>
            <ChevronDown className={'chevron-icon'} size={20} color={'#9B9B9B'}/>
        </Styled>
    );
};

export default Profile;