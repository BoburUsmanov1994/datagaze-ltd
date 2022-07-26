import React,{memo} from 'react';
import styled from "styled-components";
import {ChevronDown, Clock} from "react-feather";

const Styled = styled.div`
  display: flex;
  margin-left: 45px;
  align-items: center;
  cursor: pointer;

  .interval {
    &__clock {
      margin-right: 8px;
      margin-bottom: 1px;
    }

    &__chevron {
      margin-left: 5px;
    }

    &__text {
      font-size: 14px;
    }
  }
`;
const GridViewInterval = ({
                              ...rest
                          }) => {
    return (
        <Styled {...rest}>
            <Clock size={20} className={"interval__clock"} color={'#09121F'}/> <span className={'interval__text'}>Интервал времени 1 час</span> <ChevronDown size={20} className={"interval__chevron"} color={'#09121F'} />
        </Styled>
    );
};

export default memo(GridViewInterval);