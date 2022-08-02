import React, {memo} from 'react';
import styled from "styled-components";

const Styled = styled.div``;

const GridViewToggle = ({
                            ...rest
                        }) => {
    return (
        <Styled {...rest}>
            Toggle
        </Styled>
    );
};

export default memo(GridViewToggle);