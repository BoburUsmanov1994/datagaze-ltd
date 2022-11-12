import React from 'react';
import styled from "styled-components";
import dayjs from "dayjs";

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
    return (
        <Styled {...rest}>
            <p>2019 - {dayjs().format("YYYY")} © Разработано ООО "DATAGAZE"</p>
            <ul>
                <li>
                    <a href="@">О нас</a>
                </li>
                <li>
                    <a href="@">Помощь</a>
                </li>
                <li>
                    <a href="@">Свяжитесь с нами</a>
                </li>
            </ul>
        </Styled>
    );
};

export default Footer;