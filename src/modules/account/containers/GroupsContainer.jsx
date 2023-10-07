import React, {useEffect, useMemo, useState} from 'react';
import Section from "../../../components/section";
import {Row, Col} from "react-grid-system";
import Title from "../../../components/ui/title";
import Button from "../../../components/ui/button";
import {PlusCircle} from "react-feather";
import Flex from "../../../components/flex";
import {useStore} from "../../../store";
import {get, isNil} from "lodash";
import {useDeleteQuery, useGetAllQuery, useGetOneQuery, usePatchQuery, usePostQuery} from "../../../hooks/api";
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
import Swal from "sweetalert2";

const GroupsContainer = () => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
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
    let {data: group, isLoading: isLoadingGroup} = useGetOneQuery({
        key: [KEYS.groups, id],
        url: URLS.groups,
        id: id,
        enabled:!!(id)
    })

    const ruleListData = getSelectOptionsListFromData(get(rules, 'data.data.rules', []), 'id', 'name')

    const {mutate: addRequest, isLoading: isLoadingCreate} = usePostQuery({listKeyId: KEYS.groups})
    const {mutate: updateRequest, isLoading: isLoadingUpdate} = usePatchQuery({listKeyId: KEYS.groups})
    const {mutate: deleteRequest} = useDeleteQuery({listKeyId: KEYS.groups})
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
        const {isControling = false, rule = null, employees = [], ...rest} = data;
        addRequest({
            url: URLS.groups,
            attributes: {...rest, rule: {id: rule}, employees: employees.map(emp => ({id: emp})), isControling}
        }, {
            onSuccess: ({data: response}) => {
                setOpen(false);
            }
        })
    }
    const update = ({data}) => {
        const {isControling = false, rule = null, employees = [], ...rest} = data;
        updateRequest({
            url: `${URLS.groups}/${id}`,
            attributes: {...rest, rule: {id: rule}, employees: employees.map(emp => ({id: emp})), isControling}
        }, {
            onSuccess: ({data: response}) => {
                setId(null);
            }
        })
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
                    url: `${URLS.groups}/${_id}`,
                })
            }
        });

    }

    return (
        <>
            <Section>
                <Row className={'mb-15'}>
                    <Col xs={8}>
                        <Title>{t("Группы пользователей")}</Title>
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
                                <GroupCard handleEdit={setId} handleRemove={remove} data={item}/>
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
                <Modal open={!isNil(id)} onClose={() => setId(null)}>
                    {
                        (isLoadingUpdate || isLoadingGroup) && <ContentLoader/>
                    }
                    <Form formRequest={(params) => update(params)}
                          footer={<><Button primary block>{t('Edit')}</Button></>}>
                        <Field defaultValue={get(group,'data.data.group.name')} params={{required: true}} label={t('Name')} type={'input'} name={'name'}/>
                        <Field defaultValue={get(group,'data.data.group.description')} label={t('Description')} type={'input'} name={'description'}/>
                        <Field defaultValue={get(group,'data.data.group.rule.id')} params={{required: true}} label={t('Rule')} type={'select'} name={'rule'}
                               options={ruleListData}/>
                        <Field defaultValue={get(group,'data.data.group.employees')} params={{required: true}} isMulti label={t('Employees')} type={'select'}
                               name={'employees'}
                               options={employeeListData}/>
                        <Field defaultValue={get(group,'data.data.group.isControling')} label={t('Is controlled?')} type={'switch'} name={'isControling'}/>
                    </Form>
                </Modal>
            </Section>
        </>
    );
};

export default GroupsContainer;