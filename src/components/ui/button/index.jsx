import React from 'react';
import styled, {css} from "styled-components";

const StyledButton = styled.button`
  font-size: 16px;
  padding: 12px 24px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  border: unset;
  color: #fff;
  cursor: pointer;
  display: inline-block;

  svg {
    flex: none;
  }

  ${({lg}) => lg && css`
    padding: 18px 36px;
    font-size: 18px;
  `}
  ${({md}) => md && css`
    padding: 15px 30px;
    font-size: 16px;
  `}
  ${({danger}) => danger && css`
    background-color: #ef466f;
  `}
  ${({dark}) => dark && css`
    background-color: #1D283A;
  `}
  ${({gray}) => gray && css`
    background-color: #959595;
  `}
  ${({blue}) => blue && css`
    background-color: #5BA9BA;
  `}
  ${({brown}) => brown && css`
    background-color: #BA895B;
  `}
  ${({transparent}) => transparent && css`
    background-color: transparent;
    border: 1px solid #B3B3B3;
    color: #B3B3B3;
  `}

  ${({success}) => success && css`
    background-color: #4439C1;
  `}

  ${({bold}) => bold && css`
    font-weight: 600;
  `}

  ${({block}) => block && css`
    display: block;
    width: 100%;
  `}

  ${({primary}) => primary && css`
    background-color: #5BBA7C;
  `}

  ${({rounded}) => rounded && css`
    border-radius: 55px;
  `}



`;

const Button = ({...rest}) => {
    return (
        <StyledButton {...rest} />
    );
};

export default Button;