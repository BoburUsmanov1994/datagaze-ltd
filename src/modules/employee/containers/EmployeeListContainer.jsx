import React, {useEffect, useMemo, useState} from 'react';
import {useStore} from "../../../store";
import {get, head} from "lodash";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import Avatar from "../../../components/avatar";
import Flex from "../../../components/flex";
import dayjs from "dayjs";
import Badge from "../../../components/ui/badge";
import {useTranslation} from "react-i18next";
import Select from "../../../components/select";
import {useGetAllQuery} from "../../../hooks/api";
import {OverlayLoader} from "../../../components/loader";
import {getSelectOptionsListFromData} from "../../../utils";
import Switcher from "../../../components/switcher";

const EmployeeListContainer = ({
                                   ...rest
                               }) => {
    const {t} = useTranslation()
    const [filter, setFilter] = useState({isOnline: false})
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))

    let {data: groups, isLoading: isLoadingGroups} = useGetAllQuery({
        key: KEYS.employeeGroups, url: URLS.employeeGroups,
        params: {
            take: 100,
            skip: 0
        }
    })

    const groupListData = getSelectOptionsListFromData(get(groups, 'data.data.groups', []), 'id', 'name')

    let {data: rules, isLoading: isLoadingRules} = useGetAllQuery({
        key: KEYS.employeeRules, url: URLS.employeeRules,
        params: {
            take: 100,
            skip: 0
        }
    })

    const ruleListData = getSelectOptionsListFromData(get(rules, 'data.data.rules', []), 'id', 'name')
    const breadcrumbs = [
        {
            id: 1,
            title: t('Datagaze DLP'),
            path: '/',
        },
        {
            id: 2,
            title: t('Сотрудники'),
            path: '#',
        },
    ]
    const columns = [
        {
            title: "№",
            render: (th, tr, index, offset) => <>{offset + index + 1}</>
        },
        {
            title: t("Имя сотрудника"),
            dataIndex: 'firstName',
            render: (th, tr) => <Flex><Avatar size={'sm'} isOnline={get(tr, 'isOnline', false)}/><span
                className={'ml-10'}>{th} {get(tr, 'lastName')}</span></Flex>,
            align: 'left'
        },
        {
            title: t("Название хоста"),
            dataIndex: 'hostname',
        },
        {
            title: t("Время последного подключения"),
            dataIndex: 'createdAt',
            render: (th) => dayjs(th).format("DD-MM-YYYY HH:MM")
        },
        {
            title: t("Название компьютера"),
            dataIndex: 'computers',
            render: (th) => get(head(th), 'pcName')
        },
        {
            title: t("Группа"),
            dataIndex: 'group.name',
        },
        {
            title: t("IP/Mac"),
            dataIndex: 'computers',
            render: (th, tr) => <>{get(head(th), 'ipAddress')} <br/> {get(head(th), 'macAddress')}</>
        },
        {
            title: t("Версия агента"),
            dataIndex: 'computers',
            render: (th) => get(head(th), 'agentVersion')
        },

        {
            title: t("Правила политики"),
            dataIndex: 'rule.name',
        },
        {
            title: t("Под контролем"),
            dataIndex: 'isAgentInstalled',
            render: (th) => <Badge success={th} danger={!th}>{th ? "ДА" : "НЕТ"}</Badge>
        }
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    if (isLoadingGroups || isLoadingRules) {
        return <OverlayLoader/>;
    }

    return (
        <>
            <GridView
                headerComponent={<Flex>
                    <Select isMulti property={{
                        placeholder: 'Группы',
                        onChange: (val) => setFilter(prev => ({...prev, group: val?.map(({value}) => value)}))
                    }} options={groupListData}/>
                    <Switcher className={'ml-20'}
                              property={{onChange: (val) => setFilter(prev => ({...prev, isOnline: val}))}}
                              options={[{label: t('Оффлайн'), value: false}, {label: t('Онлайн'), value: true}]}
                    />
                    <Select className={'ml-20'} isMulti property={{
                        placeholder: 'Политика',
                        onChange: (val) => setFilter(prev => ({...prev, rule: val?.map(({value}) => value)}))
                    }} options={ruleListData}/>

                </Flex>}
                hideTimeline
                url={URLS.employees}
                keyId={KEYS.employees}
                viewUrl={`/employee/activity-log`}
                params={filter}
                tableHeaderData={
                    columns
                }
            />
        </>
    );
};

export default EmployeeListContainer;