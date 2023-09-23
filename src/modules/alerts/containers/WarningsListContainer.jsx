import React, {useEffect, useState} from 'react';
import {useStore} from "../../../store";
import {get, isEmpty} from "lodash";
import dayjs from "dayjs";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import {useTranslation} from "react-i18next";
import {Col, Container, Row} from "react-grid-system";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import Search from "../../../components/search";

const WarningsListContainer = ({
                                   id = null
                               }) => {
    const [search, handleSearch] = useState('');
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
            title: t('Предупреждения'),
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
            title: t('Содержание'),
            dataIndex: 'source',
        },
        {
            title: t('Тип документа'),
            dataIndex: 'documentType',
        },
        {
            title: t('Тип действия'),
            dataIndex: 'action',
        },
        {
            title: t('Канал'),
            dataIndex: 'channel',
        },
        {
            title: t('Уровень'),
            dataIndex: 'severity',
        },
        {
            title: t('Название компьютера'),
            dataIndex: 'computer',
            render: (th, tr) => get(tr, 'computer.pcname')
        }
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    return (
        <>
            <Container className={'gridview__header__container'} fluid>
                <Row align={"center"}>
                    <Col xs={9} className={'gridview__header'}>
                        <GridViewCalendar/>
                    </Col>
                    <Col xs={3}>
                        <Search handleSearch={handleSearch}/>
                    </Col>
                </Row>
            </Container>
            {!isEmpty(dateRange) && <GridView
                hideGridHeader
                url={URLS.alerts}
                keyId={KEYS.alerts}
                params={{employeeId: id, start: get(dateRange, 'startDate'), end: get(dateRange, 'endDate'), search}}
                tableHeaderData={columns}
            />}
        </>
    );
};

export default WarningsListContainer;