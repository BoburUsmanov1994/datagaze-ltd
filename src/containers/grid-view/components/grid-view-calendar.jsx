import React from 'react';
import styled from "styled-components";
import RangeDatepicker from "../../../components/range-datepicker";

const Styled = styled.div`
  max-width: 225px;
`;

const GridViewCalendar = ({
                              ...rest
                          }) => {

    return (
        <Styled {...rest}>
            <RangeDatepicker grid/>
        </Styled>
    );
};

export default GridViewCalendar;