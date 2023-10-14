import React from 'react';
import styled from "styled-components";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";

const Styled = styled.footer`
  border-top: 1px solid #C0C0C0;
  padding: 15px 27px;
  font-size: 14px;
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;

  p {
    margin-right: 30px;
    color: #C0C0C0;
  }

  ul {
    display: flex;
    margin: 0;

    li {
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }

      a {
        color: #C0C0C0;
      }
    }
  }
`;
const Footer = ({
                    ...rest
                }) => {
    const {t} = useTranslation()
    return (
        <Styled {...rest}>
            <p>2019 - {dayjs().format("YYYY")} © {t('Разработано ООО "Sector"')}</p>
            <ul>
                <li>
                    <a href="@">{t('О нас')}</a>
                </li>
                <li>
                    <a href="@">{t('Помощь')}</a>
                </li>
                <li>
                    <a href="@">{t('Свяжитесь с нами')}</a>
                </li>
            </ul>
        </Styled>
    );
};

export default Footer;