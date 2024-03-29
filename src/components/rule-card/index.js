import React from 'react';
import styled from "styled-components";
import {Row, Col} from "react-grid-system";
import {get} from "lodash";
import {Edit2, Eye, Trash2} from "react-feather";
import Flex from "../flex";
import {colors} from "../../constants/colors";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom"

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
                      handleRemove = () => {
                      },
                      handleEdit = () => {
                      },
                      ...rest
                  }) => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    return (
        <Styled {...rest}>
            <Row>
                <Col xs={8}>
                    <h2 className={'card__title'}>{get(data, 'name')}</h2>
                </Col>
                <Col className={'text-right'} xs={4}>
                    <Flex justify={'flex-end'}>
                        <Edit2 onClick={() => navigate(`/rules/edit/${get(data, 'id')}`)} color={'#8C8888'}
                               className={'mr-3 cursor-pointer'} size={20}/>
                        <Trash2 onClick={() => handleRemove(get(data, 'id'))} color={'#F38E8E'}
                                className={'mr-3 cursor-pointer'} size={20}/>
                    </Flex>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h4 className={'card__subtitle'}>{t("Модули")}</h4>
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