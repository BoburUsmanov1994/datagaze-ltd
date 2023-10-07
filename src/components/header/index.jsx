import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-grid-system";
import Flex from "../flex";
import Breadcrumb from "../breadcrumb";
import Dropdown from "../dropdown";
import Profile from "../profile";
import {Settings, Menu} from "react-feather";
import {get} from "lodash";
import Language from "../lang";
import {useSettingsStore} from "../../store";

const Styled = styled.header`
  padding: 15px 10px 15px 5px;
  border-bottom: 1px solid #CDCDCD;
  position: sticky;
  top: 0;
  width: 100%;
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
  }
`;

const Header = ({...rest}) => {
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
                            <Language/>
                            <Dropdown button={<Profile avatar={get(user, 'image')} username={get(user, 'username')}/>}>
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