import React, {useEffect, useState} from 'react';
import {useStore} from "../../../store";
import {get, isEmpty} from "lodash";
import dayjs from "dayjs";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import {useTranslation} from "react-i18next";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import {Col, Container, Row} from "react-grid-system";
import Search from "../../../components/search";

const VisitsListContainer = ({
                                 id
                             }) => {
    const {t} = useTranslation()
    const [search,handleSearch] = useState('');
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
            title: t('Использование интернета'),
            path: '#',
        },
        {
            id: 4,
            title: t('Посещение сайтов'),
            path: '#',
        }
    ];

    const columns = [
        {
            title: '№',
            render: (th, tr, index, offset) => offset + index + 1
        },

        {
            title: t('Хост'),
            dataIndex: 'host',
        },
        {
            title: t('Название'),
            dataIndex: 'title',
            align: 'left',
        },
        {
            title: t('Продолжительность'),
            dataIndex: 'duration',
        },
        {
            title: t('Браузер'),
            dataIndex: 'browser',
        },
        {
            title: t('Название компьютера'),
            dataIndex: 'computer.pcName',
        },
        {
            title: t('Дата и время'),
            dataIndex: 'dateTime',
            render: (th) => dayjs(th).format("DD-MM-YYYY HH:mm"),
            width: 150
        },
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
                headerComponent={<>
                    <GridViewCalendar/>
                </>}
                url={URLS.visitList}
                keyId={KEYS.visitList}
                params={{search,employeeId: id, start: get(dateRange, 'startDate'), end: get(dateRange, 'endDate')}}
                tableHeaderData={columns}
            />}
        </>
    );
};

export default VisitsListContainer;