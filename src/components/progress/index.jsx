import React from 'react';
import styled from "styled-components";
import {Line, Circle} from 'rc-progress';

const Styled = styled.div`
  width: 140px;
`;

const Progressbar = ({...rest}) => {
    return (
        <Styled {...rest}>
            <Circle percent={10} strokeWidth={4} strokeColor="#D3D3D3"/>
        </Styled>
    );
};

export default Progressbar;