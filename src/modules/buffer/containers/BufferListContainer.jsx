import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import dayjs from "dayjs";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import {useTranslation} from "react-i18next";

const BufferListContainer = ({
                                 id = null,
                             }) => {
    const {t} = useTranslation()
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const dateRange = useStore(state => get(state, 'dateRange', null))

    const breadcrumbs = [
        {
            id: 1,
            title: t('Datagaze DLP'),
            path: '/',
        },
        {
            id: 2,
            title: t('Сотрудники'),
            path: '/employees',
        },
        {
            id: 3,
            title: t('Буфер'),
            path: '#',
        }
    ];

    const columns = [
        {
            title: '№',
            render: (th, tr, index, offset) => offset + index + 1
        },
        {
            title: t('Дата и время'),
            dataIndex: 'datetime',
            render: (th) => dayjs(th).format("DD-MM-YYYY HH:mm"),
            width: 150
        },
        {
            title: t('Тип'),
            dataIndex: 'type',
            width: 200
        },
        {
            title: t('Источник'),
            dataIndex: 'source',
            align: 'left'
        },
        {
            title: t('Содержание'),
            dataIndex: 'content',
            render: (th) => th,
        },
        {
            title: t('Название компьютера'),
            dataIndex: 'pcname',
            render: (th, tr) => get(tr, 'computer.pcname')
        }
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    return (
        <>
            <GridView
                headerComponent={<>
                    <GridViewCalendar/>
                </>}
                url={URLS.buffer}
                keyId={KEYS.buffer}
                params={{employeeId: id, start: get(dateRange, 'startDate'), end: get(dateRange, 'endDate')}}
                tableHeaderData={columns}
            />
        </>
    );
};

export default BufferListContainer;