import React from 'react';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import styled from "styled-components";
import bgImg from "../../assets/images/login-bg.png"
import Brand from "../../components/brand";
import dayjs from 'dayjs'
import {includes} from "lodash";

const Styled = styled.div`
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${bgImg});
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    width: 450px;
    padding: 30px 40px 20px 40px;
    background: #FFFFFF;
    box-shadow: 1px 6px 36px -2px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
  }

  .mb-35 {
    margin-bottom: 20px;
  }

  .auth-links {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;

    li {
      margin-right: 30px;

      &:last-child {
        margin-right: 0;
      }

      a {
        color: #000;
        transition: 0.3s ease;
        padding: 5px 20px;
        border-bottom: 2px solid transparent;

        &:hover {
          color: #3B42F0;
        }

        &.active {
          font-weight: 600;
          color: #3B42F0;
          border-bottom-color: #3B42F0;
        }
      }
    }
  }

  .oferta {
    text-align: justify;
    margin-top: 20px;

    font-size: 13px;
  }

  .auth-bottom {
    text-align: center;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.3);
    font-weight: 500;
    margin-top: 20px;
  }
`;

const AuthLayout = ({...rest}) => {
    const {pathname} = useLocation()
    return (
        <Styled {...rest}>
            <div className="box">
                <div className="text-center mb-35">
                    <Brand/>
                </div>
                <ul className={'auth-links'}>
                    <li>
                        <NavLink to={'/auth'} end>
                            Вход
                        </NavLink>
                    </li>
                </ul>
                <Outlet/>
                {!includes(pathname, 'forgot-password') && !includes(pathname, 'confirm') &&
                <p className={'oferta'}>Регистрируясь на DatagazeDLP или авторизуясь через социальные сети, вы
                    соглашаетесь с
                    <a href="#"> Пользовательским соглашением</a> и <a href="#">Политикой конфиденциальности</a>.</p>}
                <p className={'auth-bottom'}>2019 - {dayjs().year()} © Разработано Datagaze LTD</p>
            </div>
        </Styled>
    );
};

export default AuthLayout;