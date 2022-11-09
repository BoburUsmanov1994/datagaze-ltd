import React from 'react';
import styled from "styled-components";
import ForgotPasswordContainer from "../containers/ForgotPasswordContainer";
import ConfirmContainer from "../containers/ConfirmContainer";
import {useParams} from "react-router-dom";

const Styled = styled.div`
  .login-description {
    font-size: 13px;
    color: #ABABAB;
    margin-bottom: 12px;
    text-align: justify;
  }

  .forget-password {
    color: #3B42F0;
    font-size: 14px;
    margin-bottom: 20px;
    display: block;
    text-decoration: underline;
  }
  .resend{
    text-align: center;
    color: #A7A7A7;
    font-weight: 400;
    cursor: pointer;
  }
  .timer{
    color: #A7A7A7;
  }
`;
const ConfirmPage = ({
                         ...rest
                     }) => {
    const {confirm_token} = useParams()
    return (
        <Styled {...rest}>
            <ConfirmContainer confirm_token={confirm_token}/>
        </Styled>
    );
};

export default ConfirmPage;