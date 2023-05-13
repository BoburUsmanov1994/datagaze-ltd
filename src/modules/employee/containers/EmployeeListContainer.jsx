import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get, head} from "lodash";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import Avatar from "../../../components/avatar";
import Flex from "../../../components/flex";
import dayjs from "dayjs";
import Badge from "../../../components/ui/badge";
import GridViewHeader from "../../../containers/grid-view/components/grid-view-header";

const EmployeeListContainer = ({
                                   ...rest
                               }) => {
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
            title: 'Сотрудники',
            path: '#',
        },
    ], [])
    const columns = [
        {
            title: "№",
            render: (th, tr, index, offset) => <>{offset + index + 1}</>
        },
        {
            title: "Имя сотрудника",
            dataIndex: 'firstName',
            render: (th, tr) => <Flex><Avatar size={'sm'} isOnline={get(tr, 'isOnline', false)}/><span
                className={'ml-10'}>{th} {get(tr, 'lastName')}</span></Flex>,
            align: 'left'
        },
        {
            title: "Название хоста",
            dataIndex: 'hostname',
        },
        {
            title: "Время последного подключения",
            dataIndex: 'createdAt',
            render: (th) => dayjs(th).format("DD-MM-YYYY HH:MM")
        },
        {
            title: "Название компьютера",
            dataIndex: 'computers',
            render: (th) => get(head(th), 'pcName')
        },
        {
            title: "Группа",
            dataIndex: 'group.name',
        },
        {
            title: "IP/Mac",
            dataIndex: 'computers',
            render: (th, tr) => <>{get(head(th), 'ipAddress')} <br/> {get(head(th), 'macAddress')}</>
        },
        {
            title: "Версия агента",
            dataIndex: 'computers',
            render: (th) => get(head(th), 'agentVersion')
        },

        {
            title: "Правила политики",
            dataIndex: 'rule.name',
        },
        {
            title: "Под контролем",
            dataIndex: 'isAgentInstalled',
            render: (th) => <Badge success={th} danger={!th}>{th ? "ДА" : "НЕТ"}</Badge>
        }
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    return (
        <>
            <GridViewHeader/>
            <GridView
                url={URLS.employees}
                keyId={KEYS.employees}
                viewUrl={`/employee/activity-log`}
                tableHeaderData={
                    columns
                }
            />
        </>
    );
};

export default EmployeeListContainer;