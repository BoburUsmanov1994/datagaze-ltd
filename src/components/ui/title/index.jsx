import React from 'react';
import styled from "styled-components";

const Styled = styled.h2`
  font-size: 24px;
  color: #000;
  font-weight: 500;

`;
const Title = ({
                   ...rest
               }) => {

    return (
        <Styled {...rest}/>
    );
};

export default Title;