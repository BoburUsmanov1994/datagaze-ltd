import React from 'react';
import styled from "styled-components";
import Avatar from "../avatar";
import {Briefcase,Phone,Users,UserCheck} from "react-feather";
import {Row, Col} from "react-grid-system"
import Flex from "../flex";

const Styled = styled.div`
  .profile {
    display: flex;
    align-items: center;

    &__avatar {
      margin-right: 50px;
    }

    &__info {
      .profile__name {
        font-size: 24px;
        color: #000;
        margin-bottom: 10px;
        font-weight: 400;
      }

      .profile__description {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        span {
          margin-left: 10px;
          font-size: 14px;
          display: inline-block;
          margin-top: 1px;
        }
      }

      .profile__subtitle {
        font-weight: 300;
        font-size: 16px;
      }
    }

    &__info__list {
      margin-top: 50px;
      margin-bottom: 50px;
      padding-left: 30px;
      li{
        margin-bottom: 8px;
        .icon{
          margin-right: 10px;
        }
        span{
          &.strong{
            font-weight: 500;
          }
        }
      }
    }
  }
`;
const EmployeeProfile = ({...rest}) => {
    return (
        <Styled {...rest}>
            <div className="profile">
                <div className="profile__avatar">
                    <Avatar/>
                </div>
                <div className={'profile__info'}>
                    <h2 className={'profile__name'}>Turapov Avazbek</h2>
                    <p className={'profile__description'}><Briefcase color={'#09121F'}
                                                                     size={18}/><span>Начальние отдела </span></p>
                    <h3 className={'profile__subtitle'}>x3440@desktop-0dac4q7</h3>
                </div>
            </div>
            <ul className={'profile__info__list'}>
                <li>
                    <Row>
                        <Col xs={4}><span className={'strong'}>IP:</span></Col>
                        <Col xs={8}><span>10.10.10.168</span></Col>
                    </Row>
                </li>
                <li>
                    <Row>
                        <Col xs={4}><span className={'strong'}>MAC:</span></Col>
                        <Col xs={8}><span>10:62:E5:C6:96:EE</span></Col>
                    </Row>
                </li>
                <li>
                    <Row>
                        <Col xs={4}><span className={'strong'}>E-mail:</span></Col>
                        <Col xs={8}><span>avaz.turapov@gmail.com</span></Col>
                    </Row>
                </li>
            </ul>
            <ul className={'profile__info__list'}>
                <li>
                    <Row>
                        <Col xs={4}><Flex><Phone size={17} className={'icon'}/><span className={'strong'}>Телефон:</span></Flex></Col>
                        <Col xs={8}><span>10.10.10.168</span></Col>
                    </Row>
                </li>
                <li>
                    <Row>
                        <Col xs={4}><Flex><Users size={17} className={'icon'}/><span className={'strong'}>Группа:</span></Flex></Col>
                        <Col xs={8}><span>10:62:E5:C6:96:EE</span></Col>
                    </Row>
                </li>
                <li>
                    <Row>
                        <Col xs={4}><Flex><UserCheck size={17} className={'icon'}/><span className={'strong'}>Роль:</span></Flex></Col>
                        <Col xs={8}><span>avaz.turapov@gmail.com</span></Col>
                    </Row>
                </li>
            </ul>
        </Styled>
    );
};

export default EmployeeProfile;