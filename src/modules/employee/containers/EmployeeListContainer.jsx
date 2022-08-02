import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";

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

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])
    return (
        <>
            <GridView
                url={URLS.employees}
                keyId={KEYS.employees}
                tableHeaderData={
                    [
                        {id: 1, title: "Имя сотрудника", key: ["firstName","lastName"],type:"array"},
                        {id: 2, title: "Название хоста", key: "hostname"},
                        {id: 3, title: "Время последного подключения", key: "lastSeen", type: 'timestamp'},
                        {id: 4, title: "Название компьютера", key: "lastComputer.pcname"},
                        {id: 5, title: "Aдрес", key: ["lastComputer.ipAddress","lastComputer.macAddress"],type: 'array',hasBreak:true},
                        {id: 6, title: "Версия агента", key: "lastComputer.agentVersion"},
                        {id: 7, title: "Группа", key: "group.name"},
                        {id: 8, title: "Правила политики", key: "rule.name"},
                        {id: 9, title: "Под контролем", key: "isAgentInstalled",type:"boolean"},
                    ]
                }
            />
        </>
    );
};

export default EmployeeListContainer;