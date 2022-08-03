import React, {memo} from 'react';
import styled from "styled-components";
import {MoreVertical} from "react-feather";

const Styled = styled.div`
  background: #FFFFFF;
  border: 1px solid #CDCDCD;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;

  .dashboard__box {
    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      h2{
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 500;
        svg{
          margin-right: 10px;
        }
      }
    }
    
    &__more{
      cursor: pointer;
      margin-left: 15px;
    }
  }
`;
const DashboardBox = ({
                          icon = '',
                          title = "Сотрудники с наибольшим количеством инцидентов",
                          children,
                          ...rest
                      }) => {
    return (
        <Styled {...rest}>
            <div className="dashboard__box__head">
                <> <h2>{icon}{title}</h2></><MoreVertical className={'dashboard__box__more'} />
            </div>
            <div className="dashboard__box__body">
                {
                    children
                }
            </div>
        </Styled>
    );
};

export default memo(DashboardBox);