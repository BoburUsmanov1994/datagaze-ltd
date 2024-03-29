import React, {useEffect, useMemo, useState} from 'react';
import {useStore} from "../../../store";
import {get, isEmpty} from "lodash";
import dayjs from "dayjs";
import Flex from "../../../components/flex";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import {useTranslation} from "react-i18next";
import {Col, Container, Row} from "react-grid-system";
import Search from "../../../components/search";

const KeyloggerListContainer = ({
                                    id = null,
                                }) => {
    const {t} = useTranslation()
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const [search, handleSearch] = useState('')
    const dateRange = useStore(state => get(state, 'dateRange', null))

    const breadcrumbs = [
        {
            id: 1,
            title: t('Sector DLP'),
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
            title: t('Название процесса'),
            dataIndex: 'process',
            render: (th, tr) => <Flex justify={'center'}><img src={`data:image/png;base64, ${get(tr, 'icon')}`} alt=""/>
                <span className={'ml-10'}>{th}</span></Flex>,
        },
        {
            title: t('Название компьютера'),
            dataIndex: 'computer',
            render: (th, tr) => get(tr, 'computer.pcName')
        },
        {
            title: t('Активное окно'),
            dataIndex: 'activeWindowName',
        },
        {
            title: t('Текст'),
            dataIndex: 'content',
            render: (th) => th,
            width:300
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
                url={URLS.keylogger}
                keyId={KEYS.keylogger}
                params={{employeeId: id, start: get(dateRange, 'startDate'), end: get(dateRange, 'endDate'),search}}
                tableHeaderData={columns}
            />}
        </>
    );
};

export default KeyloggerListContainer;