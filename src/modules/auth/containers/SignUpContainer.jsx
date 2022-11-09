import React, {useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Form from "../../../containers/form/form";
import Field from "../../../containers/form/field";
import Button from "../../../components/ui/button";
import {usePostQuery} from "../../../hooks/api";
import {OverlayLoader} from "../../../components/loader";
import {URLS} from "../../../constants/url";
import PasswordStrengthBar from "react-password-strength-bar";
import {isEqual} from "lodash";

const SignUpContainer = ({...rest}) => {

    const [val,setVal] = useState('')
    const {mutate, isLoading} = usePostQuery({url: URLS.signUp, hideSuccessToast: true})

    const navigate = useNavigate();

    const signupRequest = ({data}) => {
        mutate({url: URLS.signUp, attributes: data}, {
            onSuccess: ({data}) => {

            }
        })
    }

    if (isLoading) {
        return <OverlayLoader/>
    }

    return (
        <div>
            <p className={'login-description'}>Регистрируясь на Datagaze DLP </p>
            <Form getValueFromField={(value,name) => {
                if(isEqual(name,'password')){
                    setVal(value)
                }
            }} formRequest={signupRequest} footer={<Button block success lg bold type={'submit'}>Зарегистрироваться</Button>}>
                <Field
                    name={'username'}
                    type={'input'}
                    label={'Имя пользователя'}
                    property={{hideLabel: true, placeholder: 'Номер телефона или логин'}}
                    params={{
                        required: true,
                    }}/>
                <Field
                    name={'password'}
                    type={'input'}
                    label={'Пароль'}
                    property={{type: 'password', placeholder: 'Пароль', hideLabel: true}}
                    params={{required: true}}/>
                <PasswordStrengthBar password={val} className={'mb-15'} />
                <Field
                    name={'password_repeat'}
                    type={'input'}
                    label={'Пароль'}
                    property={{type: 'password', placeholder: 'Повторите пароль', hideLabel: true}}
                    params={{required: true}}/>
            </Form>
        </div>
    );
};

export default SignUpContainer;