import React, {useEffect, useMemo} from 'react';
import Section from "../../../components/section";
import {Row, Col} from "react-grid-system";
import Title from "../../../components/ui/title";
import Button from "../../../components/ui/button";
import {PlusCircle} from "react-feather";
import Flex from "../../../components/flex";
import AccountCard from "../components/account-card";
import {useStore} from "../../../store";
import {get} from "lodash";
import {useGetAllQuery} from "../../../hooks/api";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {OverlayLoader} from "../../../components/loader";
import EmptyPage from "../../auth/pages/EmptyPage";

const AccountsContainer = ({
                               ...rest
                           }) => {
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    let {data, isLoading} = useGetAllQuery({key: KEYS.accountList, url: URLS.accountList})
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Datagaze DLP',
            path: '/',
        },
        {
            id: 2,
            title: 'Пользователи',
            path: '/employee',
        },
        {
            id: 3,
            title: 'Управление аккаунтами',
            path: '#',
        }
    ], [])

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    if (isLoading) {
        return <OverlayLoader/>
    }
    console.log('data', data)
    return (
        <>
            <Section>
                <Row className={'mb-15'}>
                    <Col xs={8}>
                        <Title>Управление аккаунтами</Title>
                    </Col>
                    <Col xs={4} className={'text-right'}>
                        <Button primary rounded><Flex><PlusCircle size={18} className={'mr-5'}/><span>Добавить новый аккаунт</span></Flex></Button>
                    </Col>
                </Row>
                <Row>
                    {
                        get(data, 'data', [])?.length > 0 ? get(data, 'data', []).map(item => <Col key={get(item,'id')} xs={3}>
                            <AccountCard data={item}/>
                        </Col>) : <EmptyPage/>
                    }

                </Row>
            </Section>
        </>
    );
};

export default AccountsContainer;