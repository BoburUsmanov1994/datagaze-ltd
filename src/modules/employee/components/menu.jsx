import React from 'react';
import styled from "styled-components";
import {Link, NavLink, useParams, useLocation} from "react-router-dom";
import logsIcon from "../../../assets/icons/logs.svg"
import keyloggerIcon from "../../../assets/icons/keylogger.svg"
import screenIcon from "../../../assets/icons/screenshot.svg"
import wifiIcon from "../../../assets/icons/wifi.svg"
import buferIcon from "../../../assets/icons/buffer.svg"
import polygonIcon from "../../../assets/icons/polygon.svg"
import telegramIcon from "../../../assets/icons/telegram.svg"
import usbIcon from "../../../assets/icons/usb.svg"
import usbDriverIcon from "../../../assets/icons/usb-driver.svg"
import printerIcon from "../../../assets/icons/printer.svg"
import remoteIcon from "../../../assets/icons/remote.svg"
import audioIcon from "../../../assets/icons/audio.svg"
import sessionIcon from "../../../assets/icons/session.svg"
import {ChevronDown, ChevronRight} from "react-feather";
import {includes} from "lodash";

const Styled = styled.ul`
  .menu {
    &__link {
      position: relative;
      display: flex;
      align-items: center;
      padding: 15px 25px 15px 20px;
      color: #000;
      font-size: 14px;
      font-weight: 300;
      justify-content: space-between;
      align-items: center;
      min-height: 50px;

      &__left {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }

      &.active {
        background-color: #E7E7E7;
      }

      img {
        width: 20px;
        height: 20px;
        object-fit: cover;
        margin-right: 15px;
      }
    }
  }

  .submenu {
    li {
      a.submenu__link {
        color: #000;
        font-size: 13px;
        display: flex;
        align-items: center;
        padding: 12px 20px;
        border-bottom: 1px solid #CDCDCD;
        font-weight: 300;

        &.active {
          color: #084B92;
        }

        .dot {
          width: 4px;
          height: 4px;
          display: inline-block;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          background-color: #C4C4C4;
          margin: 0 16px;

        }
      }
    }
  }
`;
const Menu = ({
                  ...rest
              }) => {
    const {id} = useParams()
    const {pathname} = useLocation();
    return (
        <Styled {...rest}>
            <li>
                <NavLink className={'menu__link '} to={`/employee/activity-log/${id}`}><span
                    className={"menu__link__left"}><img
                    src={logsIcon} alt=""/>
                    <span>Журнал активности</span></span> <span className={'count'}>123</span></NavLink>
            </li>
            <li>
                <NavLink className={'menu__link '} to={`/employee/keylogger/${id}`}><span
                    className={"menu__link__left"}><img src={keyloggerIcon} alt=""/>
                    <span>Кейлогер</span></span> <span className={'count'}>564</span></NavLink>
            </li>
            <li>
                <NavLink className={'menu__link'} to={`/employee/screenshot/${id}`}><span
                    className={"menu__link__left"}><img src={screenIcon} alt=""/>
                    <span>Скриншоты</span></span> <span className={'count'}>564</span> </NavLink>
            </li>
            <li>
                <NavLink className={'menu__link'} to={`/employee/internet-use/${id}`}><span
                    className={"menu__link__left"}><img src={wifiIcon} alt=""/>
                    <span>Исп. интернета</span></span> <span
                    className={'count'}>564</span>{includes(pathname, 'internet-use') ?
                    <ChevronDown size={18} color={'#9B9B9B'} style={{position: "absolute", right: '3px'}}/> :
                    <ChevronRight size={18} color={'#9B9B9B'} style={{position: "absolute", right: '3px'}}/>}</NavLink>
                {includes(pathname, 'internet-use') && <ul className={'submenu'}>
                    <li><NavLink to={`/employee/internet-use/${id}`} className={'submenu__link'}><span
                        className={'dot'}></span><span>Посещение сайтов</span></NavLink></li>
                    <li><NavLink to={`/employee/internet-use/cloud-storage/${id}`} className={'submenu__link'}><span
                        className={'dot'}></span><span>Облачное хранилище</span></NavLink></li>
                    <li><NavLink to={`/employee/internet-use/http/${id}`} className={'submenu__link'}><span
                        className={'dot'}></span><span>HTTP запросы</span></NavLink></li>
                    <li><NavLink to={`/employee/internet-use/email/${id}`} className={'submenu__link'}><span
                        className={'dot'}></span><span>Эл. почта</span></NavLink></li>
                    <li><NavLink to={`/employee/internet-use/mail/${id}`} className={'submenu__link'}><span
                        className={'dot'}></span><span>Счётчик сообщений</span></NavLink></li>
                </ul>}
            </li>
            <li>
                <NavLink className={'menu__link'} to={`/employee/buffer/${id}`}><span
                    className={"menu__link__left"}><img src={buferIcon} alt=""/>
                    <span>Буфер</span></span> <span className={'count'}>564</span></NavLink>
            </li>
            <li>
                <NavLink className={'menu__link '} to={`/employee/warnings/${id}`}><span
                    className={"menu__link__left"}><img src={polygonIcon} alt=""/>
                    <span>Предупреждения</span></span> <span className={'count'}>564</span></NavLink>
            </li>
            <li>
                <NavLink className={'menu__link'} to={`/employee/telegram/${id}`}><span
                    className={"menu__link__left"}><img src={telegramIcon} alt=""/>
                    <span>Телеграм</span></span> <span className={'count'}>564</span></NavLink>
            </li>
            <li>
                <NavLink className={'menu__link'} to={"/employee/usb-list/1"}><span
                    className={"menu__link__left"}><img src={usbIcon} alt=""/>
                    <span>USB лист</span></span> <span className={'count'}>564</span></NavLink>
            </li>
            <li>
                <NavLink className={'menu__link'} to={`/employee/usb-file/${id}`}><span
                    className={"menu__link__left"}><img src={usbDriverIcon} alt=""/>
                    <span>USB файлы</span></span> <span className={'count'}>564</span></NavLink>
            </li>
            <li>
                <NavLink className={'menu__link'} to={`/employee/printer/${id}`}><span
                    className={"menu__link__left"}><img src={printerIcon} alt=""/>
                    <span>Принтеры</span></span> <span className={'count'}>564</span></NavLink>
            </li>
            <li>
                <NavLink className={'menu__link'} to={`/employee/remote/${id}`}><span
                    className={"menu__link__left"}><img src={remoteIcon} alt=""/>
                    <span>Удаленное упр.</span></span> <span className={'count'}>564</span></NavLink>
            </li>
            <li>
                <NavLink className={'menu__link'} to={`/employee/audio/${id}`}><span
                    className={"menu__link__left"}><img src={audioIcon} alt=""/>
                    <span>Аудио записи</span></span> <span className={'count'}>564</span></NavLink>
            </li>
            <li>
                <NavLink className={'menu__link'} to={`/employee/session/${id}`}><span
                    className={"menu__link__left"}><img src={sessionIcon} alt=""/>
                    <span>Журнал сеанса</span></span> <span className={'count'}>564</span></NavLink>
            </li>
        </Styled>
    );
};

export default Menu;