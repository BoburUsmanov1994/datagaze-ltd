import React from 'react';
import styled from "styled-components";

const Styled = styled.div`
  margin-left: 60px;
  position: relative;
  background-color: #fff;
  width: calc(100% - 60px);
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