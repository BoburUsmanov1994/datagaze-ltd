import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-grid-system";
import Brand from "../brand";
import Flex from "../flex";
import Breadcrumb from "../breadcrumb";
import Dropdown from "../dropdown";
import Profile from "../profile";
import {Settings, ExternalLink, ChevronDown} from "react-feather";
import Swal from "sweetalert2";
import {useSettingsStore, useStore} from "../../store";
import {useNavigate} from "react-router-dom";
import {get} from "lodash";

const Styled = styled.header`
  padding: 20px;
  border-bottom: 1px solid #A8A8A8;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 999;
  background-color: #fff;
  //overflow: hidden;
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

  .lang {
    display: flex;
    align-items: center;
    margin-right: 30px;

    span {
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 18px;
      margin-right: 5px;
    }

    &-body {
      padding: 10px 15px;
      width: 50px !important;
      display: none;

      li {
        font-family: 'Gilroy-Medium', sans-serif;
        margin-bottom: 5px;
        cursor: pointer;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

const Header = ({...rest}) => {
    const clearToken = useSettingsStore(state => get(state, 'setToken', () => {
    }))
    const navigate = useNavigate();
    const logout = () => {
        Swal.fire({
            title: 'Чиқишга ишончингиз комилми?',
            icon: 'warning',
            backdrop: 'rgba(0,0,0,0.9)',
            background: 'none',
            showCancelButton: true,
            confirmButtonColor: '#13D6D1',
            confirmButtonText: 'Ҳа албатта',
            cancelButtonText: 'Ортга қайтиш',
            customClass: {
                title: 'title-color',
                content: 'text-color',
                icon: 'icon-color',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                clearToken(null);
                window.localStorage.clear();
                navigate('/auth')
            }
        });
    }
    return (
        <Styled {...rest}>
            <Container fluid>
                <Row align={'center'}>
                    <Col xs={8}>
                        <Flex justify={'space-between'}>
                            <Flex>
                                <Brand/>
                                <Breadcrumb/>
                            </Flex>

                        </Flex>
                    </Col>
                    <Col xs={4}>
                        <Flex justify={'flex-end'}>
                            <Dropdown button={<div className={'lang'}><span>RU</span><ChevronDown/></div>}>
                                <ul className={'lang-body'}>
                                    <li>UZ</li>
                                    <li>EN</li>
                                    <li>RU</li>
                                </ul>
                            </Dropdown>
                            <Dropdown button={<Profile username={'Bobur Usmanov'}/>}>
                                <ul className={'profile-body'}>
                                    <li><Settings size={20}/><span>Settings</span></li>
                                    <li onClick={logout}><ExternalLink size={20}/><span>Logout</span></li>
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