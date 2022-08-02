import React from 'react';
import styled from "styled-components";
import {TimeRangeSlider} from "../../../components/range-slider";

const Styled = styled.div``;

const GridViewTimeline = ({
                              ...rest
                          }) => {
    return (
        <Styled {...rest}>
            <TimeRangeSlider />
        </Styled>
    );
};

export default GridViewTimeline;