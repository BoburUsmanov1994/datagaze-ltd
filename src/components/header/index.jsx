import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-grid-system";
import Flex from "../flex";
import Breadcrumb from "../breadcrumb";
import Dropdown from "../dropdown";
import Profile from "../profile";
import {Settings, Menu, User, LogOut} from "react-feather";
import {get} from "lodash";
import Language from "../lang";
import {useSettingsStore} from "../../store";
import {useTranslation} from "react-i18next";
import Notification from "../notification";
import {Link} from "react-router-dom";

const Styled = styled.header`
  padding: 15px 10px 15px 5px;
  border-bottom: 1px solid #CDCDCD;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: #fff;

  .profile-body {
    width: 225px !important;
    top: 300px;
    text-align: left;
    padding-top: 15px;
    padding-bottom: 15px;

    span.welcome {
      font-size: 14px;
      padding: 5px 15px;
      display: inline-block;
      margin-bottom: 10px;
    }

    li > a {
      padding: 5px 15px;
      cursor: pointer;
      transition: 0.3s ease;
      margin-bottom: 10px;
      align-items: center;
      display: flex;
      color: #6c757d;

      &:hover {
        color: #4439C1;
      }

      span {
        margin-left: 5px;
      }
    }

    .logout {
      padding-top: 10px;
      border-top: 1px solid #6c757d;
      margin-top: 10px;

      span {
        margin-left: 4px;
      }

      a {
        padding: 5px 15px;
        cursor: pointer;
        transition: 0.3s ease;
        align-items: center;
        display: flex;
        color: #6c757d;

        &:hover {
          color: #4439C1;
        }
      }
    }
  }

  .header {
    &__dots {
      margin: 0 40px;
    }
  }
`;

const Header = ({...rest}) => {
    const {t} = useTranslation()
    const user = {}
    const isMenuOpen = useSettingsStore(state => get(state, 'isMenuOpen', false))
    const setOpenMenu = useSettingsStore(state => get(state, 'setOpenMenu', () => {
    }))
    return (
        <Styled {...rest}>
            <Container fluid>
                <Row align={'center'}>
                    <Col xs={6}>
                        <Flex>
                            <Menu onClick={() => setOpenMenu(!isMenuOpen)} color={'#DEDEDE'} size={32}
                                  className={'cursor-pointer'}/>
                            <Breadcrumb/>
                        </Flex>
                    </Col>
                    <Col xs={6}>
                        <Flex justify={'flex-end'} align={'center'}>
                            <Notification/>
                            <Language/>
                            <Dropdown button={<Profile avatar={get(user, 'image')} username={get(user, 'username')}/>}>
                                <div className={'profile-body'}>
                                    <span className={'welcome'}>{t('Добро пожаловать !')}</span>
                                    <ul>
                                        <li><Link to={'/profile'}><User
                                            size={20}/><span>{t('Мой аккаунт')}</span></Link></li>
                                    </ul>
                                    <div className={'logout'}>
                                        <Link to={'/logout'}><LogOut size={20}/><span>{t('Logout')}</span></Link>
                                    </div>
                                </div>
                            </Dropdown>
                        </Flex>
                    </Col>
                </Row>
            </Container>
        </Styled>
    );
};

export default Header;