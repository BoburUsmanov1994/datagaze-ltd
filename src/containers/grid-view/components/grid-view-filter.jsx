import React, {memo} from 'react';
import styled from "styled-components";
import {Filter, ChevronDown} from "react-feather";

const Styled = styled.div`
  display: flex;
  margin-left: 45px;
  align-items: center;
  cursor: pointer;

  .filter {
    &__icon {
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

const GridViewFilter = ({
                            ...rest
                        }) => {
    return (
        <Styled {...rest}>
            <Filter className={'filter__icon'} size={20} color={'#09121F'}/> <span
            className={'filter__text'}>Фильтр</span><ChevronDown size={20} className={'filter__chevron'}
                                                                 color={'#09121F'}/>
        </Styled>
    );
};

export default memo(GridViewFilter);