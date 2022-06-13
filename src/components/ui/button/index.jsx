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
  min-width: 175px;
  ${({lg}) => lg && css`
    padding: 18px 36px;
    font-size: 18px;
  `}
  ${({danger}) => danger && css`
    background-color: #ef466f;
  `}
  ${({dark}) => dark && css`
    background-color: #1D283A;
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

`;

const Button = ({...rest}) => {
    return (
        <StyledButton {...rest} />
    );
};

export default Button;