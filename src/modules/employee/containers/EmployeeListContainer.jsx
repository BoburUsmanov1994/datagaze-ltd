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
import Field from "../../../containers/form/field";
import {useTranslation} from "react-i18next";

const EmployeeListContainer = ({
                                   ...rest
                               }) => {
    const {t} = useTranslation()
    const [filter, setFilter] = useState({isOnline: false})
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
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

    return (
        <>
            <GridView
                headerComponent={<>
                    <Field property={{onChange: (val) => setFilter(prev => ({...prev, isOnline: val}))}}
                           options={[{label: t('Оффлайн'), value: false}, {label: t('Онлайн'), value: true}]}
                           type={'switch'}/>
                </>}
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