import React from 'react';
import styled,{css} from "styled-components";
import avatarImg from "../../assets/images/avatar.png";
import {isEqual} from "lodash";

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
    border: 2px solid #fff;
    background-color: #2E9F5C;
    bottom: 5px;
    right: 18px;
  }
  
  ${({size}) => isEqual(size,'sm') && css`
  width: 50px;
    height: 50px;
    img{
      width: 50px;
      height: 50px;
    }
    .status{
      width: 12px;
      height: 12px;
      right: 0;
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