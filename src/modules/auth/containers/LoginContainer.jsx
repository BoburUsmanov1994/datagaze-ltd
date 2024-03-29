import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from "../../../containers/form/form";
import Field from "../../../containers/form/field";
import Button from "../../../components/ui/button";
import {useGetAllQuery, usePostQuery} from "../../../hooks/api";
import {useSettingsStore, useStore} from "../../../store";
import {get, isNil} from "lodash";
import Swal from "sweetalert2";
import {OverlayLoader} from "../../../components/loader";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import {useTranslation} from "react-i18next";

const LoginContainer = () => {
    const [tokenData, setTokenData] = useState(null)
    const navigate = useNavigate();
    const {t} = useTranslation()

    const setAuth = useStore(state => get(state, 'setAuth', () => {
    }))
    const setUser = useStore(state => get(state, 'setUser', () => {
    }))
    const setToken = useSettingsStore(state => get(state, 'setToken', () => {
    }))

    const {data: profile, isLoading: isLoadingProfile} = useGetAllQuery({
        key: [KEYS.profile, 'getme'],
        url: URLS.profile,
        hideErrorMsg: true,
        headers: {
            'Authorization': `Bearer ${tokenData}`
        },
        enabled: !isNil(tokenData),
        cb: {
            success: (res) => {
                setAuth(true);
                setUser(get(res, 'data'));
                setToken(tokenData);
                navigate("/employee");
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    backdrop: 'rgba(0,0,0,0.9)',
                    background: 'none',
                    title: t('Добро пожаловать в нашу систему'),
                    showConfirmButton: false,
                    timer: 2000,
                    customClass: {
                        title: 'title-color',
                    },
                });
            }
        }
    });


    const {mutate, isLoading} = usePostQuery({url: URLS.login, hideSuccessToast: true})

    const loginRequest = ({data}) => {
        mutate({url: URLS.login, attributes: data}, {
            onSuccess: ({data: response}) => {
                setTokenData(get(response, 'token'));
            }
        })
    }

    if (isLoading || isLoadingProfile) {
        return <OverlayLoader/>;
    }

    return (
        <div>
            <p className={'login-description'}>{t('Введите имя пользователя и пароль для доступа к панели\n' +
                '                администратора.')}</p>
            <Form formRequest={loginRequest}
                  footer={<Button block success lg bold type={'submit'}>{t('Войти')}</Button>}>
                <Field
                    name={'username'}
                    type={'input'}
                    label={t('Имя пользователя')}
                    property={{hideLabel: true, placeholder: t('Введите имя пользователя')}}
                    params={{
                        required: true,
                    }}/>
                <Field
                    name={'password'}
                    type={'input'}
                    label={t('Пароль')}
                    property={{type: 'password', placeholder: t('Пароль'), hideLabel: true}}
                    params={{required: true}}/>
            </Form>
        </div>
    );
};

export default LoginContainer;