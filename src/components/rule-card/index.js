import React from 'react';
import styled from "styled-components";
import {Row, Col} from "react-grid-system";
import {get} from "lodash";
import {Edit2, Settings, Trash2} from "react-feather";
import Flex from "../flex";
import {colors} from "../../constants/colors";
import {ContentLoader} from "../loader";
import Form from "../../containers/form/form";
import Button from "../ui/button";
import Field from "../../containers/form/field";
import Modal from "../modal";

const Styled = styled.div`
  border: 1px solid #CDCDCD;
  padding: 25px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  margin-bottom: 15px;

  .card {
    &__title {
      font-size: 18px;
      font-weight: 700;
      color: #000;
      padding-left: 15px;
      border-left: 4px solid #FAA669;
    }

    &__subtitle {
      font-size: 14px;
      font-weight: 400;
      color: #7D7D7D;
      margin-top: 15px;
      margin-bottom: 15px;
    }

    &__badge {
      display: inline-block;
      padding: 5px 15px;
      border-radius: 30px;
      margin-bottom: 8px;
      margin-right: 8px;
    }

  }

  .mr-3 {
    margin-right: 10px;
  }
`;

const RuleCard = ({
                      data,
                      ...rest
                  }) => {
    return (
        <Styled {...rest}>
            <Row>
                <Col xs={8}>
                    <h2 className={'card__title'}>{get(data, 'name')}</h2>
                </Col>
                <Col className={'text-right'} xs={4}>
                    <Flex justify={'flex-end'}>
                        <Settings color={'#8C8888'} className={'mr-3 cursor-pointer'} size={18}/>
                        <Edit2 color={'#8C8888'} className={'mr-3 cursor-pointer'} size={18}/>
                        <Trash2 color={'#F38E8E'} className={'mr-3 cursor-pointer'} size={18}/>
                    </Flex>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h4 className={'card__subtitle'}>Модули</h4>
                </Col>
                <Col xs={12}>
                    {
                        get(data, 'modules', []).map((_item, i) => <span style={{backgroundColor: colors[i]}}
                                                                         className={'card__badge'}>{get(_item, 'name')}</span>)
                    }
                </Col>
            </Row>
        </Styled>
    );
};

export default RuleCard;