import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import dayjs from "dayjs";
import Flex from "../../../components/flex";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import {useTranslation} from "react-i18next";

const KeyloggerListContainer = ({
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
            title: t('Журнал активности'),
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
            title: t('Название процесса'),
            dataIndex: 'process',
            render: (th, tr) => <Flex><img src={`data:image/png;base64, ${get(tr, 'icon')}`} alt=""/>
                <span className={'ml-10'}>{th}</span></Flex>,
            align: 'left'
        },
        {
            title: t('Активное окно'),
            dataIndex: 'activeWindowName',
        },
        {
            title: t('Текст'),
            dataIndex: 'text',
            render: (th) => th,
        },
        {
            title: t('Название компьютера'),
            dataIndex: 'pcname',
            render: (th, tr) => get(tr, 'computerId.pcname')
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
                url={URLS.keylogger}
                keyId={KEYS.keylogger}
                params={{employeeId: id, start: get(dateRange, 'startDate'), end: get(dateRange, 'endDate')}}
                tableHeaderData={columns}
            />
        </>
    );
};

export default KeyloggerListContainer;