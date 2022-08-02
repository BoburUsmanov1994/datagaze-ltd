import React, {memo} from 'react';
import styled, {css} from "styled-components";

const Styled = styled.span`
  padding: 5px 15px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background-color: #fff;
  font-weight: 400;
  border: 1px solid transparent;

  ${({success}) => success && css`
    color: #61B58D;
    border-color: #61B58D;
  `}

  ${({danger}) => danger && css`
    color: #FF3838;
    border-color: #FF3838;
  `}
`;
const Badge = ({...rest}) => {
    return (
        <Styled {...rest}/>
    );
};

export default memo(Badge);