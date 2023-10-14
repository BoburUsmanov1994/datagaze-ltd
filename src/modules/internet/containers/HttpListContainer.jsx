import React, {useEffect, useMemo, useState} from 'react';
import {useStore} from "../../../store";
import {get, head, isEmpty} from "lodash";
import dayjs from "dayjs";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import GridViewHeader from "../../../containers/grid-view/components/grid-view-header";
import config from "../../../config";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import Search from "../../../components/search";
import {Col, Container, Row} from "react-grid-system";

const CloudStorageListContainer = ({
                                       id
                                   }) => {
    const [search,handleSearch] = useState('')
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const dateRange = useStore(state => get(state, 'dateRange', null))
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Sector DLP',
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
            title: 'Хост',
            dataIndex: 'host',
        },
        {
            title: 'Браузер',
            dataIndex: 'browser',
        },
        {
            title: 'Название компьютера',
            dataIndex: 'computer.pcName',
        },
        {
            title: 'Файл',
            dataIndex: 'files',
            render: (th) => <a target={'_blank'}
                               href={`${config.FILE_SERVER}${get(head(th), 'filePath')}`}>{get(head(th), 'fileName')}</a>,
        },
        {
            title: 'Дата и время',
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
                url={URLS.webSniffs}
                keyId={KEYS.webSniffs}
                params={{employeeId: id, start: get(dateRange, 'startDate'), end: get(dateRange, 'endDate'),search}}
                tableHeaderData={columns}
            />}
        </>
    );
};

export default CloudStorageListContainer;