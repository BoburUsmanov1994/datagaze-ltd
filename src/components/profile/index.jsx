import React from 'react';
import styled from "styled-components";
import {User,ChevronDown} from "react-feather";

const Styled = styled.div`
  border: 1px solid #C2C2C2;
  padding: 8px 16px;
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
  .user-icon{
    margin-right: 12px;
    line-height: 1;
  }
  .chevron-icon{
    margin-top: 3px;
  }
`

const Profile = ({
                     username = 'Admin',
                     ...rest
                 }) => {
    return (
        <Styled {...rest}>
            <User className={'user-icon'} size={26} color={'#9B9B9B'}/>
            <span className={'username'}>{username}</span>
            <ChevronDown className={'chevron-icon'} size={22} color={'#9B9B9B'} />
        </Styled>
    );
};

export default Profile;