import React from 'react';
import styled from "styled-components";
import notFoundImg from "../../../assets/images/404.png"
import Button from "../../../components/ui/button";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
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
const NotFoundPage = ({...rest}) => {
    const {t} = useTranslation();
    const  navigate = useNavigate();
    return (
        <Styled {...rest}>
            <img className={'img-fluid'} src={notFoundImg}  alt="404"/>
            <Button success onClick={()=>navigate("/")}>
                {t("Back to home")}
            </Button>
        </Styled>
    );
};

export default NotFoundPage;