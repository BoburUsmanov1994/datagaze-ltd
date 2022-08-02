import React, {memo} from 'react';
import styled from "styled-components";

const Styled = styled.div`
`;
const GridViewDropdown = ({...rest}) => {
    return (
        <Styled {...rest}>
            Dropdown
        </Styled>
    );
};

export default memo(GridViewDropdown);