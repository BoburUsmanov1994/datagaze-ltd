import React from 'react';
import styled from "styled-components";

const Styled = styled.div`
  margin-left: 250px;
  position: relative;
  padding-top: 18px;
  background-color: #fff;
  width: calc(100% - 250px);
  padding-bottom: 20px;
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