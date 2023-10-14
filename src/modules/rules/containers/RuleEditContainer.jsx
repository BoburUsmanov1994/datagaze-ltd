import React, {useEffect} from 'react';
import {useStore} from "../../../store";
import {find, get, isEqual, includes} from "lodash";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import {useTranslation} from "react-i18next";
import {Col, Container, Row} from "react-grid-system";
import Search from "../../../components/search";
import Section from "../../../components/section";
import Title from "../../../components/ui/title";
import Button from "../../../components/ui/button";
import {useNavigate} from "react-router-dom";
import {ArrowLeft, Settings} from "react-feather";
import Flex from "../../../components/flex";
import Field from "../../../containers/form/field";
import Form from "../../../containers/form/form";
import {useGetAllQuery, useGetOneQuery, usePatchQuery} from "../../../hooks/api";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {OverlayLoader} from "../../../components/loader";
import {getSelectOptionsListFromData} from "../../../utils";


const RuleEditContainer = ({id = null}) => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    let {data: rule, isLoading: isLoadingRule} = useGetOneQuery({
        key: [KEYS.rules, id],
        url: URLS.rules,
        id: id,
        enabled: !!(id)
    })

    let {data: modules, isLoading: isLoadingModules} = useGetAllQuery({
        key: KEYS.ruleModules, url: URLS.ruleModules,
        params: {
            take: 100,
            skip: 0
        }
    })

    const moduleListData = getSelectOptionsListFromData(get(modules, 'data.data.modules', []), 'name', 'description')


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

    const {mutate: updateRequest, isLoading: isLoadingUpdate} = usePatchQuery({listKeyId: KEYS.rules})

    const breadcrumbs = [
        {
            id: 1,
            title: t('Sector DLP'),
            path: '/',
        },
        {
            id: 3,
            title: t('Правила политики'),
            path: '#',
        }
    ];

    const getPropertyValue = (list = [], key, value, dataKey = 'name') => {
        return get(find(list, _item => isEqual(get(_item, `${key}`), value)), dataKey);
    }

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, []);

    if (isLoadingRule || isLoadingUsbGroups || isLoadingModules || isLoadingDocuments) {
        return <OverlayLoader/>
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

            }
        })
    }

    return (
        <>
            {isLoadingUpdate && <OverlayLoader/>}
            <Container className={'gridview__header__container'} fluid>
                <Row align={"center"}>
                    <Col xs={9} className={'gridview__header'}>
                        <GridViewCalendar/>
                    </Col>
                    <Col xs={3}>
                        <Search/>
                    </Col>
                </Row>
            </Container>
            <Section>
                <Row align={"center"} className={'mb-30'}>
                    <Col xs={8}>
                        <Title>{t("Форма правила")}</Title>
                    </Col>
                    <Col xs={4} className={'text-right'}>
                        <Button onClick={() => navigate('/rules')} success><Flex><ArrowLeft
                            className={'mr-5'}/><span>{t('Вернуться к списку')}</span></Flex></Button>
                    </Col>
                </Row>
                <Form formRequest={(params) => update(params)} footer={<><Button success>{t('Сохранить')}</Button></>}>
                    <Row className={'mb-15'}>
                        <Col xs={6}>
                            <Field defaultValue={get(rule, 'data.data.rule.name')} params={{required: true}}
                                   label={t('Название политики')}
                                   type={'input'} name={'name'}/>
                            <Field defaultValue={get(rule, 'data.data.rule.description')}
                                   label={t('Описание')} type={'textarea'} name={'description'}/>

                            <Field defaultValue={get(rule, 'data.data.rule.documents', []).map(_document => ({
                                value: get(_document, 'id'),
                                label: get(_document, 'name')
                            }))} params={{required: true}} isMulti label={t('Категории ключевых слов')} type={'select'}
                                   name={'documents'}
                                   options={documentListData}/>
                        </Col>
                        <Col xs={6}>
                            <h3 className={'module__title'}>{t('Список модулей')}</h3>
                            <p className={'module__description'}>{t('Пожалуйста, выберите модули, которые вы хотите включить')}</p>
                            <Row>
                                {moduleListData.map(_module => <Col xs={6}>
                                    <Field property={{hideLabel: true}}
                                           defaultValue={includes(get(rule, 'data.data.rule.modules', []).map(({name}) => name), get(_module, 'value'))}
                                           type={'switch'} name={'description'}
                                           options={[{
                                               value: get(_module, 'value'),
                                               label: <Flex>{t(get(_module, 'label'))} <Settings
                                                   color={includes(get(rule, 'data.data.rule.modules', []).map(({name}) => name), get(_module, 'value')) ? '#3f51b5' : '#adb5bd'}
                                                   className={'cursor-pointer ml-10'} size={20}/></Flex>
                                           }]}/>
                                </Col>)}
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Section>
        </>
    );
};

export default RuleEditContainer;