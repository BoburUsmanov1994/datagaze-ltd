import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import dayjs from "dayjs";
import Flex from "../../../components/flex";
import GridViewHeader from "../../../containers/grid-view/components/grid-view-header";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";

const WarningsListContainer = ({
                                   id = null,
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
            title: 'Предупреждения',
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
            title: 'Содержание',
            dataIndex: 'source',
        },
        {
            title: 'Тип документа',
            dataIndex: 'documentType',
        },
        {
            title: 'Тип действия',
            dataIndex: 'action',
        },
        {
            title: 'Канал',
            dataIndex: 'channel',
        },
        {
            title: 'Уровень',
            dataIndex: 'severity',
        },
        {
            title: 'Название компьютера ',
            dataIndex: 'computer',
            render: (th, tr) => get(tr, 'computer.pcname')
        }
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    return (
        <>
            <GridViewHeader/>
            <GridView
                url={URLS.alerts}
                keyId={KEYS.alerts}
                params={{employeeId: id, start: get(dateRange, 'startDate'), end: get(dateRange, 'endDate')}}
                tableHeaderData={columns}
            />
        </>
    );
};

export default WarningsListContainer;