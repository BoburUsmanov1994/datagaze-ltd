import React from "react";
import {Controller, useForm} from "react-hook-form";
import styled from "styled-components";
import FormProvider from "../../context/form/FormProvider";

const StyledForm = styled.form`
  .form-group {
    margin-bottom: 20px;
  }

  .form-btn {
    margin-top: 25px;
  }

  .form-error-message {
    display: inline-block;
    font-weight: 400;
    font-size: 13px;
    display: flex;
    align-items: center;
    color: #ef466f;
    margin-top: 5px;
  }
`;
const Form = ({
                  children,
                  formRequest,
                  isFetched,
                  footer = '',
                  getValueFromField = () => {
                  },
                  mainClassName = '',
                  ...rest
              }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
        getValues,
        setValue,
        watch,
        control,
    } = useForm({mode: "onChange"});

    const onSubmit = (data) => {
        console.log('form data', data)
        formRequest({data, setError});
    };
    const attrs = {
        Controller,
        register,
        errors,
        control,
        getValues,
        watch,
        setError,
        setValue,
        ...rest,
    };


    return (
        <StyledForm
            onSubmit={handleSubmit(onSubmit)}
            {...rest}
            className={mainClassName}
        >
            <FormProvider value={{attrs, getValueFromField}}>
                {children}
            </FormProvider>
            {footer}
        </StyledForm>
    );
};

export default Form;
