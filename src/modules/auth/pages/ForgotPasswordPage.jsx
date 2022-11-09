import React from 'react';
import styled from "styled-components";
import ForgotPasswordContainer from "../containers/ForgotPasswordContainer";

const Styled = styled.div`
  .login-description{
    font-size: 13px;
    color: #ABABAB;
    margin-bottom: 12px;
    text-align: center;
  }
  .forget-password{
    color:#3B42F0;
    font-size: 14px;
    margin-bottom: 20px;
    display: block;
    text-decoration: underline;
  }
`;
const ForgotPasswordPage = ({
                                ...rest
                            }) => {
    return (
        <Styled {...rest}>
            <ForgotPasswordContainer/>
        </Styled>
    );
};

export default ForgotPasswordPage;