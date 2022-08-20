import React from 'react';
import styled from "styled-components";
import {Row, Col} from "react-grid-system"
import CountUp from 'react-countup';
import Flex from "../flex";
import decreaseLine from "../../assets/images/decrease-line.svg"
import decreaseCursor from "../../assets/images/decrease-cursor.svg"

const Styled = styled.div`
  border: 1px solid #CDCDCD;
  padding: 12px 20px 6px 20px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 15px;

  .card {
    &__title {
      font-size: 12px;
      font-weight: 300;
      color: #000;
    }

    &__count {
      font-size: 22px;
      font-weight: 700;
      margin-left: 15px;
      color: #8A8A8A;
    }

    &__top {
      margin-bottom: 6px;
    }

    &__graphic {
      display: flex;
      align-items: center;
    }

    &__percent {
      font-size: 11px;
      margin-left: 10px;
    }
  }
`;

const Card = ({
                  percent = 0,
                  title = '-',
                  icon = '',
                  count = 0,
                  children,
                  ...rest
              }) => {
    return (
        <Styled {...rest}>
            <Row align={'center'}>
                <Col xs={2}>
                    {
                        icon
                    }
                </Col>
                <Col xs={10} className={'text-right'}>
                    <Flex className={'card__top'} align={'center'} justify={'flex-end'}>
                        <h4 className={'card__title'}>{title}</h4>
                        <h2 className={'card__count'}><CountUp duration={4} end={count} /></h2>
                    </Flex>
                    <Flex justify={'flex-end'}>
                        <div className="card__graphic">
                            <img src={decreaseLine} alt="line"/>
                            <img src={decreaseCursor} alt="cursor"/>
                        </div>
                        <p className={'card__percent'}>{percent}%</p>
                    </Flex>
                </Col>
            </Row>
        </Styled>
    );
};

export default Card;