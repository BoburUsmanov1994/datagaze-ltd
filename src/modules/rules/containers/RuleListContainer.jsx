import React, {useEffect, useMemo, useState} from 'react';
import Section from "../../../components/section";
import {Row, Col} from "react-grid-system"
import Title from "../../../components/ui/title";
import {useStore} from "../../../store";
import {get, find, isEqual} from "lodash";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {useGetAllQuery, usePostQuery} from "../../../hooks/api";
import {ContentLoader, OverlayLoader} from "../../../components/loader";
import Button from "../../../components/ui/button";
import Flex from "../../../components/flex";
import {PlusCircle} from "react-feather";
import EmptyPage from "../../auth/pages/EmptyPage";
import RuleCard from "../../../components/rule-card";
import Form from "../../../containers/form/form";
import Field from "../../../containers/form/field";
import Modal from "../../../components/modal";
import {useTranslation} from "react-i18next";
import {getSelectOptionsListFromData} from "../../../utils";

const RuleListContainer = () => {
    const [open, setOpen] = useState(false)
    const {t} = useTranslation()
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Datagaze DLP',
            path: '/',
        },
        {
            id: 2,
            title: 'Rules',
            path: '#',
        }
    ], [])
    let {data, isLoading} = useGetAllQuery({
        key: KEYS.rules, url: URLS.rules,
        params: {
            take: 100,
            skip: 0
        }
    })
    let {data: modules, isLoading: isLoadingModules} = useGetAllQuery({
        key: KEYS.ruleModules, url: URLS.ruleModules,
        params: {
            take: 100,
            skip: 0
        }
    })

    const moduleListData = getSelectOptionsListFromData(get(modules, 'data.data.modules', []), 'name', 'name')

    let {data: documents, isLoading: isLoadingDocuments} = useGetAllQuery({
        key: KEYS.ruleDocs, url: URLS.ruleDocs,
        params: {
            take: 100,
            skip: 0
        }
    })

    const documentListData = getSelectOptionsListFromData(get(documents, 'data.data.documents', []), 'id', 'name')

    let {data: usbGroups, isLoading: isLoadingUsbGroups} = useGetAllQuery({
        key: KEYS.ruleUsbGroups, url: URLS.ruleUsbGroups,
        params: {
            take: 100,
            skip: 0
        }
    })

    const usbGroupsListData = getSelectOptionsListFromData(get(usbGroups, 'data.data.documents', []), 'id', 'name')

    const {mutate: addRequest, isLoading: isLoadingCreate} = usePostQuery({listKeyId: KEYS.rules})


    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    if (isLoading || isLoadingModules || isLoadingDocuments || isLoadingUsbGroups) {
        return <OverlayLoader/>
    }

    const getPropertyValue = (list = [], key, value, dataKey = 'name') => {
        return get(find(list, _item => isEqual(get(_item, `${key}`), value)), dataKey);
    }

    const add = ({data}) => {
        const {modules: _modules, documents, ...rest} = data
        addRequest({
            url: URLS.rules, attributes: {
                ...rest, modules: _modules.map(module => ({
                    name: getPropertyValue(get(modules, 'data.data.modules', []), 'name', module, 'name'),
                    description: getPropertyValue(get(modules, 'data.data.modules', []), 'name', module, 'description'),
                    settings: (getPropertyValue(get(modules, 'data.data.modules', []), 'name', module, 'settings') || []).map(setting => ({
                        name: get(setting, 'name'),
                        value: get(setting, 'value'),
                    })),
                })), documents: documents.map(doc => ({id: doc}))
            }
        }, {
            onSuccess: ({data: response}) => {
                setOpen(false);
            }
        })
    }

    return (
        <Section>
            <Row className={'mb-15'} items={'center'}>
                <Col xs={8}>
                    <Title>Правило политики</Title>
                </Col>
                <Col xs={4} className={'text-right'}>
                    <Button onClick={() => setOpen(true)} primary rounded><Flex><PlusCircle size={18}
                                                                                            className={'mr-5'}/><span>Добавить правило</span></Flex></Button>
                </Col>

            </Row>
            <Row>
                {
                    get(data, 'data.data.rules', [])?.length > 0 ? get(data, 'data.data.rules', []).map(item =>
                        <Col key={get(item, 'id')}
                             xs={6}>
                            <RuleCard data={item}/>
                        </Col>) : <EmptyPage/>
                }
            </Row>
            <Modal open={open} onClose={() => setOpen(false)}>
                {
                    isLoadingCreate && <ContentLoader/>
                }
                <Form formRequest={(params) => add(params)} footer={<><Button primary block>{t('Add')}</Button></>}>
                    <Field params={{required: true}} label={'Name'} type={'input'} name={'name'}/>
                    <Field params={{required: true}} label={'Description'} type={'input'} name={'description'}/>
                    <Field params={{required: true}} isMulti label={'Modules'} type={'select'} name={'modules'}
                           options={moduleListData}/>
                    <Field params={{required: true}} isMulti label={'Documents'} type={'select'} name={'documents'}
                           options={documentListData}/>
                    <Field label={'Usb group'} type={'select'} name={'usbGroup.id'}
                           options={usbGroupsListData}/>
                </Form>
            </Modal>
        </Section>
    );
};

export default RuleListContainer;