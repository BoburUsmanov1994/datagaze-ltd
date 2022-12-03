import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import dayjs from "dayjs";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import GridViewHeader from "../../../containers/grid-view/components/grid-view-header";

const CloudStorageListContainer = ({
                                 id,
                                 ...rest
                             }) => {
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
            title: 'Использование интернета',
            path: '#',
        },
        {
            id: 4,
            title: 'Облачное хранилище',
            path: '#',
        }
    ], [])

    const columns = [
        {
            title: '№',
            render: (th, tr, index, offset) => offset + index + 1
        },
        {
            title: 'Дата и время',
            dataIndex: 'datetime',
            render: (th) => dayjs(th).format("DD-MM-YYYY HH:mm"),
            width: 150
        },
        {
            title: 'Хост',
            dataIndex: 'host',
        },
        {
            title: 'Название',
            dataIndex: 'title',
            align: 'left',
        },
        {
            title: 'Продолжительность',
            dataIndex: 'duration',
        },
        {
            title: 'Браузер',
            dataIndex: 'browser',
        },
        {
            title: 'Название компьютера',
            dataIndex: 'computer.pcname',
        }
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])
    return (
        <>
            <GridViewHeader/>
            <GridView
                url={URLS.visitList}
                keyId={KEYS.visitList}
                params={{employeeId: id, start: get(dateRange, 'startDate'), end: get(dateRange, 'endDate')}}
                tableHeaderData={columns}
            />
        </>
    );
};

export default CloudStorageListContainer;