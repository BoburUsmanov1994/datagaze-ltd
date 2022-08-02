import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import {Col, Container, Row} from "react-grid-system";
import GridView from "../../../containers/grid-view";


const EmployeeProfileContainer = ({...rest}) => {
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
            path: '/employees',
        },
        {
            id: 3,
            title: 'Активные приложения',
            path: '#',
        }
    ], [])

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])
    return (
        <>
            <GridView
                tableHeaderData={
                    [
                        {id: 1, title: "Название процесса", key: "title"},
                        {id: 2, title: "Название", key: "name"},
                        {id: 3, title: "Имя компьютера", key: "computer__name"},
                        {id: 4, title: "Дата и время", key: "title"},
                        {id: 5, title: "Продолжительность", key: "title"},
                    ]
                }
                tableBodyData={
                    [

                    ]
                }
            />
        </>
    );
};

export default EmployeeProfileContainer;