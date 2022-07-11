import React from 'react';
import styled,{css} from "styled-components";
const Styled = styled.div`
    border:1px solid #C4C4C4;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  min-height: 36px;
  justify-content: space-between;
  border-radius: 2px;
  margin-bottom: 12px;
  ${({right}) => right && css`
    border-right: 6px solid ${({borderColor}) => borderColor || '#C4C4C4'};
  `}
  ${({right}) => !right && css`
    border-left: 6px solid ${({borderColor}) => borderColor || '#C4C4C4'};
  `}
  .category{
    &__title{
      font-size: 11px;
      font-weight: 300;
    }
    &__percent{
      font-weight: 500;
      font-size: 13px;
      color: #111A18;
      margin-left: 5px;
    }
  }
`;
const Category = ({
    color='',
    title = '-',
    percent = 0,
                      right = false,
    ...rest
                  }) => {
    return (
        <Styled borderColor={color} right={right} {...rest}>
            {right ? <>
            <span className={'category__percent'}>{percent}%</span><span className={'category__title'}>{title}</span></> : <><span className={'category__title'}>{title}</span>
                <span className={'category__percent'}>{percent}%</span></>}
        </Styled>
    );
};

export default Category;