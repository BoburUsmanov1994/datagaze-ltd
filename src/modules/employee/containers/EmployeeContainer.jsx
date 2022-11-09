import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get, isNil} from "lodash";
import {Col, Container, Row} from "react-grid-system";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import {OverlayLoader} from "../../../components/loader";


const EmployeeContainer = ({id = null,...rest}) => {
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const dateRange = useStore(state => get(state, 'dateRange', null))
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Datagaze DLP',
            path: '/',
        },
        {
            id: 2,
            title: 'Сотрудники',
            path: '/employees',
        },
        {
            id: 3,
            title: 'Журнал активности',
            path: '#',
        }
    ], [])

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    return (
        <>
            <GridView
                url={URLS.activity}
                keyId={KEYS.activity}
                params={{employeeId:id,start:get(dateRange,'startDate'),end:get(dateRange,'endDate')}}
                viewUrl={`/employee/activity-log`}
                tableHeaderData={
                    [
                        {id: 1, title: "Название процесса", key: "title"},
                        {id: 2, title: "Название", key: "name"},
                        {id: 3, title: "Имя компьютера", key: "computer__name"},
                        {id: 4, title: "Дата и время", key: "title"},
                        {id: 5, title: "Продолжительность", key: "title"},
                    ]
                }
            />
        </>
    );
};

export default EmployeeContainer;