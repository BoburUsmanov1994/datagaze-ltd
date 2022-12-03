import React from 'react';
import styled from "styled-components";
import {ExternalLink, Settings, Trash2} from "react-feather";
import shieldIcon from "../../../assets/icons/shield.svg";
import Avatar from "../../../components/avatar";
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
    align-items: flex-start;
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
    font-size: 13px;
  }

  .group {
    &__title {
      font-size: 14px;
      color: #5A5A5A;
      font-weight: 700;
      margin-bottom: 3px;
    }

    &__description {
      color: #7D7D7D;
      font-size: 13px;
      font-weight: 400;
    }

    &__content {
      padding-left: 15px;
      width: 100%;
    }

    &__avatars {
      padding: 15px 0;
      display: flex;
      overflow: hidden;
      height: 50px;

      li {
        position: absolute;

        div, img {
          width: 30px;
          height: 30px;
        }
      }

    }
  }

  .group__content__top {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
const GroupCard = ({
                       data = {},
                       ...rest
                   }) => {
    return (
        <Styled {...rest}>
            <div className="card__content">
                <img src={shieldIcon} alt=""/>
                <div className={'group__content'}>
                    <div className={'group__content__top'}>
                        <div>
                            <h2 className={'group__title'}>{get(data, 'name')}</h2>
                            <p className={'group__description'}>{get(data, 'description')}</p>
                        </div>
                        <ExternalLink size={18} color={'#D8D8D8'} className={'cursor-pointer'}/>
                    </div>
                    <ul className={'group__avatars'}>
                        {
                            get(data, 'employees', []).map((emp, i) => <li key={i} style={{left: 15 * i + 65 + 'px'}}>
                                <Avatar size={'sm'}/></li>)
                        }
                    </ul>
                </div>
            </div>
            <div className="card__bottom">
                <div className={'card__bottom__left'}>
                    <Settings className={'cursor-pointer mr-5'} size={18}/> Изменить настройки
                </div>
                <Trash2 className={'cursor-pointer'} color={'#F38E8E'} size={18}/>
            </div>
        </Styled>
    );
};

export default GroupCard;