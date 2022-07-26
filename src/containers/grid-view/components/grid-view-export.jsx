import React, {memo} from 'react';
import styled from "styled-components";
import {ChevronDown, ExternalLink} from "react-feather";

const Styled = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  .export {
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
const GridViewExport = ({
                            ...rest
                        }) => {
    return (
        <Styled {...rest}>
            <ExternalLink color={'#09121F'} className={"export__icon"} size={20}/> <span className={"export__text"}>Экспорт</span><ChevronDown color={'#09121F'} className={"export__chevron"} size={20}/>
        </Styled>
    );
};

export default memo(GridViewExport);