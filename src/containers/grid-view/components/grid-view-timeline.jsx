import React, {memo} from 'react';
import styled from "styled-components";
import {TimeRangeSlider} from "../../../components/range-slider";

const Styled = styled.div`
  border-bottom: 1px solid #CDCDCD;
`;

const GridViewTimeline = ({
                              ...rest
                          }) => {
    return (
        <Styled {...rest}>
            <TimeRangeSlider/>
        </Styled>
    );
};

export default memo(GridViewTimeline);