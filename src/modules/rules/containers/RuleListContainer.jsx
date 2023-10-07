import React, {useEffect, useMemo, useState} from 'react';
import Section from "../../../components/section";
import {Row, Col} from "react-grid-system"
import Title from "../../../components/ui/title";
import {useStore} from "../../../store";
import {get, find, isEqual, isNil} from "lodash";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {useDeleteQuery, useGetAllQuery, useGetOneQuery, usePatchQuery, usePostQuery} from "../../../hooks/api";
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
import Swal from "sweetalert2";

const RuleListContainer = () => {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
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
            title: t('Rules'),
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

    let {data: rule, isLoading: isLoadingRule} = useGetOneQuery({
        key: [KEYS.rules, id],
        url: URLS.rules,
        id: id,
        enabled: !!(id)
    })

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
    const {mutate: updateRequest, isLoading: isLoadingUpdate} = usePatchQuery({listKeyId: KEYS.rules})
    const {mutate: deleteRequest} = useDeleteQuery({listKeyId: KEYS.rules})


    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    if (isLoading || isLoadingModules || isLoadingDocuments || isLoadingUsbGroups) {
        return <OverlayLoader/>
    }

    const getPropertyValue = (list = [], key, value, dataKey = 'name') => {
        return get(find(list, _item => isEqual(get(_item, `${key}`), value)), dataKey);
    }


    const remove = (_id) => {
        Swal.fire({
            title: t('Are you sure?'),
            icon: 'error',
            backdrop: 'rgba(0,0,0,0.9)',
            background: 'none',
            confirmButtonColor: '#CD4472',
            confirmButtonText: t('Delete'),
            showCancelButton: true,
            cancelButtonColor: '',
            cancelButtonText: t('Cancel'),
            customClass: {
                title: 'title-color',
                content: 'text-color',
                icon: 'icon-color',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRequest({
                    url: `${URLS.rules}/${_id}`,
                })
            }
        });

    }
    const add = ({data}) => {
        const {modules: _modules, documents, usbGroup, ...rest} = data
        addRequest({
            url: URLS.rules, attributes: usbGroup.id ? {
                ...rest, modules: _modules.map(module => ({
                    name: getPropertyValue(get(modules, 'data.data.modules', []), 'name', module, 'name'),
                    description: getPropertyValue(get(modules, 'data.data.modules', []), 'name', module, 'description'),
                    settings: (getPropertyValue(get(modules, 'data.data.modules', []), 'name', module, 'settings') || []).map(setting => ({
                        name: get(setting, 'name'),
                        value: get(setting, 'value'),
                    })),
                })), documents: documents.map(doc => ({id: doc})),
                usbGroup
            } : {
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

    const update = ({data}) => {
        const {modules: _modules, documents, usbGroup, ...rest} = data
        updateRequest({
            url: `${URLS.rules}/${id}`, attributes: usbGroup.id ? {
                ...rest, modules: _modules.map(module => ({
                    name: getPropertyValue(get(modules, 'data.data.modules', []), 'name', get(module, 'value'), 'name'),
                    description: getPropertyValue(get(modules, 'data.data.modules', []), 'name', get(module, 'value'), 'description'),
                    settings: (getPropertyValue(get(modules, 'data.data.modules', []), 'name', get(module, 'value'), 'settings') || []).map(setting => ({
                        name: get(setting, 'name'),
                        value: get(setting, 'value'),
                    })),
                })), documents: documents.map(doc => ({id: doc})),
                usbGroup
            } : {
                ...rest, modules: _modules.map(module => ({
                    name: getPropertyValue(get(modules, 'data.data.modules', []), 'name', get(module, 'value'), 'name'),
                    description: getPropertyValue(get(modules, 'data.data.modules', []), 'name', get(module, 'value'), 'description'),
                    settings: (getPropertyValue(get(modules, 'data.data.modules', []), 'name', get(module, 'value'), 'settings') || []).map(setting => ({
                        name: get(setting, 'name'),
                        value: get(setting, 'value'),
                    })),
                })), documents: documents.map(doc => ({id: doc}))
            }
        }, {
            onSuccess: ({data: response}) => {
                setId(false);
            }
        })
    }

    return (
        <Section>
            <Row className={'mb-15'} items={'center'}>
                <Col xs={8}>
                    <Title>{t("Правило политики")}</Title>
                </Col>
                <Col xs={4} className={'text-right'}>
                    <Button onClick={() => setOpen(true)} primary rounded><Flex><PlusCircle size={18}
                                                                                            className={'mr-5'}/><span>{t("Добавить правило")}</span></Flex></Button>
                </Col>

            </Row>
            <Row>
                {
                    get(data, 'data.data.rules', [])?.length > 0 ? get(data, 'data.data.rules', []).map(item =>
                        <Col key={get(item, 'id')}
                             xs={6}>
                            <RuleCard handleEdit={setId} handleRemove={remove} data={item}/>
                        </Col>) : <EmptyPage/>
                }
            </Row>
            <Modal open={open} onClose={() => setOpen(false)}>
                {
                    isLoadingCreate && <ContentLoader/>
                }
                <Form formRequest={(params) => add(params)} footer={<><Button primary block>{t('Add')}</Button></>}>
                    <Field params={{required: true}} label={t('Name')} type={'input'} name={'name'}/>
                    <Field params={{required: true}} label={t('Description')} type={'input'} name={'description'}/>
                    <Field params={{required: true}} isMulti label={t('Modules')} type={'select'} name={'modules'}
                           options={moduleListData}/>
                    <Field params={{required: true}} isMulti label={t('Documents')} type={'select'} name={'documents'}
                           options={documentListData}/>
                    <Field label={t('Usb group')} type={'select'} name={'usbGroup.id'}
                           options={usbGroupsListData}/>
                </Form>
            </Modal>
            <Modal open={!isNil(id)} onClose={() => setId(null)}>
                {
                    (isLoadingUpdate || isLoadingRule) && <ContentLoader/>
                }
                <Form formRequest={(params) => update(params)} footer={<><Button primary block>{t('Edit')}</Button></>}>
                    <Field defaultValue={get(rule, 'data.data.rule.name')} params={{required: true}} label={t('Name')}
                           type={'input'} name={'name'}/>
                    <Field defaultValue={get(rule, 'data.data.rule.description')} params={{required: true}}
                           label={t('Description')} type={'input'} name={'description'}/>
                    <Field defaultValue={get(rule, 'data.data.rule.modules', []).map(_module => ({
                        value: get(_module, 'name'),
                        label: get(_module, 'name')
                    }))} params={{required: true}} isMulti label={t('Modules')} type={'select'} name={'modules'}
                           options={moduleListData}/>
                    <Field defaultValue={get(rule, 'data.data.rule.documents', []).map(_document => ({
                        value: get(_document, 'id'),
                        label: get(_document, 'name')
                    }))} params={{required: true}} isMulti label={t('Documents')} type={'select'} name={'documents'}
                           options={documentListData}/>
                    <Field defaultValue={get(rule, 'data.data.rule.usbGroup')} label={t('Usb group')} type={'select'}
                           name={'usbGroup.id'}
                           options={usbGroupsListData}/>
                </Form>
            </Modal>
        </Section>
    );
};

export default RuleListContainer;