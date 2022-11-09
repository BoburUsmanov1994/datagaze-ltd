import React from 'react';
import SignUpContainer from "../containers/SignUpContainer";
import styled from "styled-components";

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
const SignUpPage = ({...rest}) => {
    return (
        <Styled>
            <SignUpContainer {...rest} />
        </Styled>
    );
};

export default SignUpPage;