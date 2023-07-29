import React from 'react';
import styled from "styled-components";
import {Settings, Trash2} from "react-feather";
import Avatar from "../../../components/avatar";
import {useTranslation} from "react-i18next";
import {get} from "lodash";

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
    width: 100%;
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
  }

  .card {
    &__title {
      font-size: 16px;
      color: #000;
      font-weight: 500;
      margin-bottom: 6px;
    }

    &__description {
      color: #7D7D7D;
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 5px;
    }

    &__content {
      &__left {
        padding-left: 12px;
        margin-right: 30px;
      }
    }
  }
`;
const ListViewCard = ({
                          data = {},
                          ...rest
                      }) => {
    const {t} = useTranslation();
    return (
        <Styled {...rest}>
            <div className={'card__content'}>
                <div className="card__content__left">
                    <Avatar bordered size={'sm'}/>
                </div>
                <div className="card__content__right">
                    <h3 className={'card__title'}>{get(data, 'pcName')}</h3>
                    <p className={'card__description'}>
                        {t("Количество сотрудников:")} {get(data,'employees',[])?.length}
                    </p>
                    <p className={'card__description'}>
                        {get(data,'ipAddress','-')}
                    </p>
                </div>
            </div>
            <div className="card__bottom">
                <div className={'card__bottom__left'}>
                    <Settings className={'cursor-pointer mr-5'} size={18}/> {t("Редактировать")}
                </div>
                <Trash2 className={'cursor-pointer'} color={'#F38E8E'} size={18}/>
            </div>
        </Styled>
    );
};

export default ListViewCard;