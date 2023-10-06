import React from 'react';
import styled, {css} from "styled-components";
import avatarImg from "../../assets/images/employee.png";
import {isEqual} from "lodash";

const Styled = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

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
    border: 2px solid #fff;
    background-color: #2E9F5C;
    bottom: 5px;
    right: 18px;
  }

  ${({size}) => isEqual(size, 'sm') && css`
    width: 56px;
    height: 56px;

    img {
      width: 56px;
      height: 56px;
    }

    .status {
      width: 12px;
      height: 12px;
      right: 0;
    }
  `}

  ${({size}) => isEqual(size, 'md') && css`
    width: 60px;
    height: 60px;

    img {
      width: 60px;
      height: 60px;
    }

    .status {
      width: 16px;
      height: 16px;
      right: 0;
    }
  `}
  ${({bordered}) => bordered && css`
    position: relative;
    border-radius: 50%;
    border: 1px dashed #707070;
    &:before{
      width: 107.5%;
      height: 107.5%;
      border-radius: 50%;
      border: 1px dashed #C6C6C6;
      position: absolute;
      content: "";
    }
    &:after{
      width: 115%;
      height: 115%;
      border-radius: 50%;
      border: 1px dashed #E2E2E2;
      position: absolute;
      content: "";
    }
  `}
`;
const Avatar = ({
                    size = 'lg',
                    isOnline = false,
                    ...rest
                }) => {
    return (
        <Styled size={size} {...rest}>
            <img src={avatarImg} alt="avatar"/>
            {isOnline && <span className={"status"}></span>}
        </Styled>
    );
};

export default Avatar;