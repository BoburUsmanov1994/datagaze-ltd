import React, {useEffect, useMemo} from 'react';
import Section from "../../../components/section";
import {Col, Row} from "react-grid-system";
import Title from "../../../components/ui/title";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import {useStore} from "../../../store";
import {get, isArray} from "lodash";
import Badge from "../../../components/ui/badge";
import dayjs from "dayjs";

const IncidentsListContainer = ({
                                    ...rest
                                }) => {
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
            title: 'Инциденты',
            path: '#',
        }
    ], [])


    const columns = [
        {
            title: '№',
            render: (th, tr, index, offset) => offset + index + 1
        },
        {
            title: 'Название хоста',
            dataIndex: 'employee.hostname'
        },

        {
            title: 'Время',
            dataIndex: 'time',
            render: (th) => dayjs(th).format("DD-MM-YYYY HH:mm"),
        },
        {
            title: 'Тип документа',
            dataIndex: 'documentType'
        },
        {
            title: 'Действия',
            dataIndex: 'action'
        },
        {
            title: 'Канал',
            dataIndex: 'channel',
        },
        {
            title: 'Уровень',
            dataIndex: 'rate',
        },
        {
            title: 'Инцидент',
            dataIndex: 'severity',
        },
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])
    return (
        <Section>
            <Row className={'mb-15'}>
                <Col xs={12}>
                    <Title>Инциденты</Title>
                </Col>
            </Row>
            <GridView
                url={URLS.allIncidents}
                keyId={KEYS.allIncidents}
                tableHeaderData={columns}
                hideTimeline
            />
        </Section>
    );
};

export default IncidentsListContainer;