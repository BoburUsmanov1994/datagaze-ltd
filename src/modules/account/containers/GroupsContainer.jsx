import React, {useEffect, useMemo, useState} from 'react';
import Section from "../../../components/section";
import {Row, Col} from "react-grid-system";
import Title from "../../../components/ui/title";
import Button from "../../../components/ui/button";
import {PlusCircle} from "react-feather";
import Flex from "../../../components/flex";
import AccountCard from "../components/account-card";
import {useStore} from "../../../store";
import {get} from "lodash";
import {useGetAllQuery, usePostQuery} from "../../../hooks/api";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {ContentLoader, OverlayLoader} from "../../../components/loader";
import EmptyPage from "../../auth/pages/EmptyPage";
import GroupCard from "../components/group-card";
import {useTranslation} from "react-i18next";
import Form from "../../../containers/form/form";
import Field from "../../../containers/form/field";
import Modal from "../../../components/modal";
import {getSelectOptionsListFromData} from "../../../utils";

const GroupsContainer = ({
                             ...rest
                         }) => {
    const [open, setOpen] = useState(false)
    const {t} = useTranslation()
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    let {data, isLoading} = useGetAllQuery({
        key: KEYS.groups, url: URLS.groups,
        params: {
            take: 100,
            skip: 0
        }
    })

    let {data: employees, isLoading: isLoadingEmployees} = useGetAllQuery({
        key: KEYS.employees, url: URLS.employees,
        params: {
            take: 100,
            skip: 0
        }
    })

    const employeeListData = getSelectOptionsListFromData(get(employees, 'data.data.result', []), 'id', 'username')

    let {data: rules, isLoading: isLoadingRules} = useGetAllQuery({
        key: KEYS.rules, url: URLS.rules,
        params: {
            take: 100,
            skip: 0
        }
    })

    const ruleListData = getSelectOptionsListFromData(get(rules, 'data.data.rules', []), 'id', 'name')

    const {mutate: addRequest, isLoading: isLoadingCreate} = usePostQuery({listKeyId: KEYS.groups})
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Datagaze DLP',
            path: '/',
        },
        {
            id: 2,
            title: 'Группы пользователей',
            path: '#',
        }
    ], [])


    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    if (isLoading || isLoadingEmployees || isLoadingRules) {
        return <OverlayLoader/>
    }

    const add = ({data}) => {
        const {isControling=false,...rest} = data;
        addRequest({
            url: URLS.groups, attributes: {...rest,isControling}
        }, {
            onSuccess: ({data: response}) => {
                setOpen(false);
            }
        })
    }

    return (
        <>
            <Section>
                <Row className={'mb-15'}>
                    <Col xs={8}>
                        <Title>Группы пользователей</Title>
                    </Col>
                    <Col xs={4} className={'text-right'}>
                        <Button onClick={() => setOpen(true)} primary rounded><Flex><PlusCircle size={18}
                                                                                                className={'mr-5'}/><span>{t('Добавить новую группу')}</span></Flex></Button>
                    </Col>
                </Row>
                <Row>
                    {
                        get(data, 'data.data.groups', [])?.length > 0 ? get(data, 'data.data.groups', []).map(item =>
                            <Col key={get(item, 'id')}
                                 xs={3}>
                                <GroupCard data={item}/>
                            </Col>) : <EmptyPage/>
                    }
                </Row>
                <Modal open={open} onClose={() => setOpen(false)}>
                    {
                        isLoadingCreate && <ContentLoader/>
                    }
                    <Form formRequest={(params) => add(params)} footer={<><Button primary block>{t('Add')}</Button></>}>
                        <Field params={{required: true}} label={t('Name')} type={'input'} name={'name'}/>
                        <Field label={t('Description')} type={'input'} name={'description'}/>
                        <Field params={{required: true}} label={t('Rule')} type={'select'} name={'rule'}
                               options={ruleListData}/>
                        <Field params={{required: true}} isMulti label={t('Employees')} type={'select'}
                               name={'employees'}
                               options={employeeListData}/>
                        <Field label={t('Is controlled?')} type={'switch'} name={'isControling'}/>
                    </Form>
                </Modal>
            </Section>
        </>
    );
};

export default GroupsContainer;