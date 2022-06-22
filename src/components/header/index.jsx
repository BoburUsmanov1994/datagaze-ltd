import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-grid-system";
import Brand from "../brand";
import Flex from "../flex";
import Breadcrumb from "../breadcrumb";
import Dropdown from "../dropdown";
import Profile from "../profile";
import {Settings, ExternalLink, ChevronDown, Menu} from "react-feather";
import Swal from "sweetalert2";
import {useSettingsStore, useStore} from "../../store";
import {useNavigate} from "react-router-dom";
import {get} from "lodash";

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

`;

const Header = ({...rest}) => {
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
                        <Flex justify={'flex-end'}>
                            <Dropdown button={<Profile username={'Bobur Usmanov'}/>}>
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