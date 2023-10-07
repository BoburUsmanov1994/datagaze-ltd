import React from 'react';
import styled from "styled-components";

const Styled = styled.div`
  position: relative;
  background-color: #fff;
  flex: 1;
  overflow-x: auto;
`;

const Content = ({children, ...rest}) => {
    return (
        <Styled {...rest}>
            {children}
        </Styled>
    );
};

export default Content;