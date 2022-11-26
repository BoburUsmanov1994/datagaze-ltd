import React, {useEffect, useState, useRef} from 'react';
import styled from "styled-components";

const Styled = styled.h2`

  font-size: 20px;
  color: #000;
  //margin-bottom: 30px;
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