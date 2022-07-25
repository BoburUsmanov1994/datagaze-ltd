import React from 'react';
import styled from "styled-components";
import avatarImg from "../../assets/images/avatar.png";

const Styled = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  img {
    width: 150px;
    height: 150px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    object-fit: cover;
  }

  .status {
    position: absolute;
    width: 22px;
    height: 22px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border:2px solid #fff;
    background-color: #2E9F5C;
    bottom: 5px;
    right: 18px;
  }
`;
const Avatar = ({
                    ...rest
                }) => {
    return (
        <Styled {...rest}>
            <img src={avatarImg} alt="avatar"/>
            <span className={"status"}></span>
        </Styled>
    );
};

export default Avatar;