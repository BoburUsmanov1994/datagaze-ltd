import React from 'react';
import styled from "styled-components";
import {NavLink, useParams} from "react-router-dom";
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

const Styled = styled.ul`
  .menu {
    &__link {
      display: flex;
      align-items: center;
      padding: 15px 20px;
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
        width: 18px;
        margin-right: 15px;
      }
    }
  }
`;
const Menu = ({
                  ...rest
              }) => {
    const {id} = useParams()
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
                    <span>Скриншоты</span></span> <span className={'count'}>564</span></NavLink>
            </li>
            <li>
                <NavLink className={'menu__link'} to={`/employee/internet-use/${id}`}><span
                    className={"menu__link__left"}><img src={wifiIcon} alt=""/>
                    <span>Исп. интернета</span></span> <span className={'count'}>564</span></NavLink>
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