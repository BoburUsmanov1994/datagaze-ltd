import React from 'react';
import styled from "styled-components";
import Avatar from "../../../components/avatar";
import {Mail, Settings, Trash2} from "react-feather";
import Flex from "../../../components/flex";
import {get} from "lodash"

const Styled = styled.div`
  padding: 15px 15px 10px;
  border: 1px solid #CDCDCD;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.11);
  border-radius: 4px;
  background-color: #fff;
  min-width: 300px;
  margin-bottom: 30px;
  width: 100%;

  .card__content {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;

    .avatar {
      min-width: 80px;
      text-align: center;
      margin-right: 10px;
      margin-left: 15px;
    }

    h2 {
      font-size: 16px;
      margin-bottom: 3px;
    }

    h4 {
      font-size: 14px;
      color: #7D7D7D;
      margin-bottom: 5px;
    }

    .card__msg {
      font-size: 12px;
      color: #7D7D7D;
    }
  }

  .card__bottom {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card__bottom__left {
    display: flex;
    align-items: center;
    color: #7D7D7D;
    font-size: 14px;
  }
`;
const AccountCard = ({
                         data = {},
                         ...rest
                     }) => {
    return (
        <Styled {...rest}>
            <div className="card__content">
                <div className="avatar"><Avatar size={'md'}/></div>
                <div>
                    <h2>{get(data, 'firstName')}</h2>
                    <h4>{get(data, 'role')}</h4>
                    <Flex className={'card__msg'}><Mail className={'mr-5'}
                                                        size={16}/><span>Отправить письмо</span></Flex>
                </div>
            </div>
            <div className="card__bottom">
                <div className={'card__bottom__left'}>
                    <Settings className={'cursor-pointer mr-5'} size={20}/> Редактировать
                </div>
                <Trash2 className={'cursor-pointer'} color={'#F38E8E'} size={20}/>
            </div>
        </Styled>
    );
};

export default AccountCard;