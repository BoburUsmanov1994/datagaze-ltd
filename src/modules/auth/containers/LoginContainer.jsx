import React from 'react';
import {useNavigate,Link} from 'react-router-dom';
import Form from "../../../containers/form/form";
import Field from "../../../containers/form/field";
import Button from "../../../components/ui/button";
import {usePostQuery} from "../../../hooks/api";
import {useSettingsStore} from "../../../store";
import {get} from "lodash";
import Swal from "sweetalert2";
import {OverlayLoader} from "../../../components/loader";
import {URLS} from "../../../constants/url";
import Icon from "../../../components/ui/icon";

const LoginContainer = ({...rest}) => {
    const {mutate, isLoading} = usePostQuery({url: URLS.login, hideSuccessToast: true})
    const setToken = useSettingsStore(state => get(state, 'setToken', () => {
    }))
    const navigate = useNavigate();

    const loginRequest = ({data}) => {
        mutate({url: URLS.login, attributes: data}, {
            onSuccess: ({data}) => {
                setToken(get(data, 'token', null))
                navigate("/dashboard");
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    backdrop: 'rgba(0,0,0,0.9)',
                    background: 'none',
                    title: 'Добро пожаловать в нашу систему',
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: {
                        title: 'title-color',
                    },
                });
            }
        })
    }

    if (isLoading) {
        return <OverlayLoader/>
    }

    return (
        <div>
            <p className={'login-description'}>Введите имя пользователя и пароль для доступа к панели
                администратора.</p>
            <Form formRequest={loginRequest} footer={<Button block success lg bold type={'submit'}>Войти</Button>}>
                <Field
                    name={'username'}
                    type={'input'}
                    label={'Имя пользователя'}
                    property={{hideLabel: true, placeholder: 'Введите имя пользователя'}}
                    params={{
                        required: true,
                    }}/>
                <Field
                    name={'password'}
                    type={'input'}
                    label={'Пароль'}
                    property={{type: 'password', placeholder: 'Пароль', hideLabel: true}}
                    params={{required: true}}/>
                    <Link className={'forget-password'} to={'/auth/forget-password'}>Забыли пароль?</Link>
            </Form>
        </div>
    );
};

export default LoginContainer;