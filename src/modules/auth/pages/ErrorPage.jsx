import React from 'react';
import styled from "styled-components";
import errorImg from "../../../assets/images/3819287.jpg"
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Button from "../../../components/ui/button";
const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  img{
    height: 80vh;
  }
`;
const ErrorPage = ({...rest}) => {
    const {t} = useTranslation();
    const  navigate = useNavigate();
    return (
        <Styled {...rest}>
            <img className={'img-fluid'} src={errorImg}  alt="Error"/>
            <Button danger onClick={()=>navigate("/")}>
                {t("Back to home")}
            </Button>
        </Styled>
    );
};

export default ErrorPage;