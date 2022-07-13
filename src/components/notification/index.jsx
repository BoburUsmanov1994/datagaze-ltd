import React, {memo} from 'react';
import styled from "styled-components";
import bellImg from "../../assets/images/bell.png"
import CountUp from "react-countup";

const Styled = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  .notification {
    &__count {
      position: absolute;
      background-color: #E84C4C;
      color: #fff;
      padding: 3px;
      top: -1px;
      right: -4px;
      font-size: 8px;
      width: 16px;
      height: 16px;
      display: flex;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
    }
  }
`;

const Notification = ({
                          count = 14,
                          ...rest
                      }) => {
    return (
        <Styled {...rest}>
            <img src={bellImg} alt="bell"/>
            <span className={'notification__count'}><CountUp end={count} duration={3} /></span>
        </Styled>
    );
};

export default memo(Notification);