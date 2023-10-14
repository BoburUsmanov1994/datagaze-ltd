import React from 'react';
import {createGlobalStyle, ThemeProvider} from "styled-components";
import Wrapper from "../components/wrapper";
import {ToastContainer} from "react-toastify";
import "nprogress/nprogress.css";
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }

  h1, h2, h3, h4, h5, h6, p, ul {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  body {
    color: #000;
    font-size: 16px;
    line-height: 1.25;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
  }

  .title-color {
    color: #fff !important;
    font-size: 30px !important;
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
  }

  #nprogress .bar {
    background: #4439C1 !important;
    height: 4px !important;
    z-index: 99999 !important;
  }

  #nprogress .spinner-icon {
    border-top-color: #4439C1 !important;
    border-left-color: #4439C1 !important;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-danger {
    color: #EF142F;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .rodal, .rodal-mask {
    z-index: 999 !important;
  }

  .rodal-dialog {
    z-index: 1000;
  }

  .w-100 {
    width: 100%;
  }

  .horizontal-scroll {
    overflow-x: auto;
    white-space: nowrap;
  }

  .mr-5 {
    margin-right: 5px !important;
  }

  .mr-16 {
    margin-right: 16px !important;
  }

  .mt-32 {
    margin-top: 32px !important;
  }

  .mb-15 {
    margin-bottom: 15px !important;
  }

  .mt-30 {
    margin-top: 30px !important;
  }

  .mt-50 {
    margin-top: 50px !important;
  }

  .mb-30 {
    margin-bottom: 30px !important;
  }

  .mb-20 {
    margin-bottom: 20px !important;
  }

  .ml-10 {
    margin-left: 10px;
  }

  .w-100 {
    width: 100% !important;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #F5F5F5;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #4439C1;
    border-radius: 6px;
  }

  .mr-10 {
    margin-right: 10px !important;
  }

  .mr-20 {
    margin-right: 20px !important;
  }

  .ml-20 {
    margin-left: 20px !important;
  }

  .mt-25 {
    margin-top: 25px !important;
  }

  .mb-25 {
    margin-bottom: 25px !important;
  }

  .rbc-day-bg.rbc-today {
    background-color: rgba(68, 57, 193, 0.3);
  }

  .rbc-event.rbc-selected {
    background-color: transparent;
  }

  .rc-checkbox {
    position: relative;
    width: 15px;
    height: 15px;
  }

  .label__danger {
    color: #f1556c;
  }

  .rc-checkbox .rc-checkbox-checked {

  }

  .rc-checkbox .rc-checkbox-inner {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    background: red;
    width: 100%;
    height: 100%;
  }

  .form-select::placeholder {
    color: #000 !important;
  }

  * {
    scrollbar-color: #4439C1 #F5F5F5;
    scrollbar-width: thin;
  }

  .bg-danger {
    background-color: rgba(247, 102, 82, 0.1);
  }

  .bg-success {
    background-color: rgba(33, 213, 155, 0.1);
  }

  .bg-primary {
    background-color: rgba(87, 184, 255, 0.1);
  }

  table {
    border-collapse: collapse;
  }

  .scheduler-container {
    height: 100vh;
    width: 100vw;
  }

  .gridview__header__container {
    padding: 10px;
    border-bottom: 1px solid #CDCDCD;
    position: relative;

    .gridview__header {
      display: flex;
      align-items: center;
    }

    .form-group {
      margin-bottom: 0;
    }

    .form-btn {
      margin-top: 0;
    }

    label {
      margin-bottom: 0 !important;
    }
  }

  .module__title {
    font-weight: 500;
    margin-bottom: 5px;
    font-size: 16px;
  }

  .module__description {
    font-size: 14px;
    margin-bottom: 15px;
  }

  @media print {
    @page {
      size: landscape
    }
  }

`;
const Theme = ({children}) => {
    return (
        <ThemeProvider theme={{}}>
            <GlobalStyles/>
            <ToastContainer/>
            <Wrapper>
                {children}
            </Wrapper>
        </ThemeProvider>
    );
};

export default Theme;