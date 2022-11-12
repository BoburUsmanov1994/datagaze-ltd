import React, {useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Form from "../../../containers/form/form";
import Field from "../../../containers/form/field";
import Button from "../../../components/ui/button";
import {useGetAllQuery, usePostQuery} from "../../../hooks/api";
import {useSettingsStore, useStore} from "../../../store";
import {get, isNil} from "lodash";
import Swal from "sweetalert2";
import {OverlayLoader} from "../../../components/loader";
import {URLS} from "../../../constants/url";

const LoginContainer = ({...rest}) => {

    const [tokenData, setTokenData] = useState(null)
    const navigate = useNavigate();

    const setAuth = useStore(state => get(state, 'setAuth', () => {
    }))
    const setUser = useStore(state => get(state, 'setUser', () => {
    }))
    const setToken = useSettingsStore(state => get(state, 'setToken', () => {
    }))

    const {data: profile, isLoadingProfile} = useGetAllQuery({
        key: 'tokenData',
        url: URLS.profile,
        hideErrorMsg: true,
        headers: {
            'Authorization': `Bearer ${tokenData}`
        },
        enabled: !!(tokenData)
    });


    const {mutate, isLoading} = usePostQuery({url: URLS.login, hideSuccessToast: true})


    const loginRequest = ({data}) => {
        mutate({url: URLS.login, attributes: data}, {
            onSuccess: ({data}) => {
                setTokenData(get(data, 'token'));
            }
        })
    }

    useEffect(() => {
        if (!isNil(get(profile, 'data'))) {
            setToken(tokenData);
            setAuth(true);
            setUser(get(profile, 'data'));
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
    }, [get(profile, 'data')])

    if (isLoading || isLoadingProfile) {
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
                <Link className={'forget-password'} to={'/auth/forgot-password'}>Забыли пароль?</Link>
            </Form>
        </div>
    );
};

export default LoginContainer;