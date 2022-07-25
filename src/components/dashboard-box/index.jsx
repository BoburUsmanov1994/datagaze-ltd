import React from 'react';
import styled from "styled-components";

const Styled = styled.div`
  border: 1px solid #CDCDCD;
  border-radius: 9px;
  padding: 20px;
`

const DashboardBox = ({
                          children,
                          ...rest
                      }) => {
    return (
        <Styled {...rest}>
            {children}
        </Styled>
    );
};

export default DashboardBox;