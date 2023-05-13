import React, {useEffect} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-grid-system";
import Flex from "../flex";
import Breadcrumb from "../breadcrumb";
import Dropdown from "../dropdown";
import Profile from "../profile";
import {Settings, Menu,Search} from "react-feather";
import dots from "../../assets/images/dots.png";
import Notification from "../notification";
import RangeDatepicker from "../range-datepicker";
import {useGetAllQuery} from "../../hooks/api";
import {KEYS} from "../../constants/key";
import {URLS} from "../../constants/url";
import {useSettingsStore, useStore} from "../../store";
import {get, isNil} from "lodash";

const Styled = styled.header`
  padding: 15px 10px 15px 5px;
  border-bottom: 1px solid #CDCDCD;
  position: fixed;
  top: 0;
  left: 60px;
  width: calc(100% - 60px);
  z-index: 999;
  background-color: #fff;

  .profile-body {
    width: 200px;
    top: 300px;
    text-align: left;
    padding-top: 15px;
    padding-bottom: 15px;

    li {
      padding: 5px 15px;
      cursor: pointer;
      transition: 0.3s ease;
      margin-bottom: 6px;
      align-items: center;
      display: flex;

      &:last-child {
        margin-bottom: 0;
      }

      span {
        margin-left: 10px;
        font-size: 15px;
      }

      &:hover {
        color: #13D6D1;
      }
    }
  }

  .header {
    &__dots {
     margin: 0 40px;
    }
    &__search{
      margin-right: 40px;
    }
  }

`;

const Header = ({...rest}) => {
    const user = {}
    return (
        <Styled {...rest}>
            <Container fluid>
                <Row align={'center'}>
                    <Col xs={6}>
                        <Flex>
                            <Menu color={'#DEDEDE'} size={32} className={'cursor-pointer'}/>
                            <Breadcrumb/>
                        </Flex>
                    </Col>
                    <Col xs={6}>
                        <Flex justify={'flex-end'} align={'center'}>
                            <Search color={'#C4C4C4'} size={28} className={'header__search'}/>
                            <Notification />
                            <img className={'header__dots'} src={dots} alt="dots"/>
                            <Dropdown button={<Profile  avatar={get(user,'image')} username={get(user,'username')}/>}>
                                <ul className={'profile-body'}>
                                    <li><Settings size={20}/><span>Settings</span></li>
                                </ul>
                            </Dropdown>
                        </Flex>
                    </Col>
                </Row>
            </Container>
        </Styled>
    );
};

export default Header;