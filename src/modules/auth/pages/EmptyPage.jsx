import React from 'react';
import styled from "styled-components";
import {Folder} from "react-feather";
import {useTranslation} from "react-i18next";

const Styled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;

  h2 {
    font-weight: 500;
    font-size: 60px;
    color: #343a40;
    margin-bottom: 10px;
  }

  h5 {
    font-size: 18px;
    color: #343a40;
    margin-bottom: 15px;
    font-weight: 400;
  }
`;
const ErrorPage = ({...rest}) => {
    const {t} = useTranslation()
    return (
        <Styled {...rest}>
            <h2>{t("Упс...")}</h2>
            <h5>{t("Мы не можем найти данные за выбранный период")}</h5>
            <Folder size={80} color={'#4439C1'}/>
        </Styled>
    );
};

export default ErrorPage;