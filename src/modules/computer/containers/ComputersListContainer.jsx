import React, {useEffect, useMemo} from 'react';
import Section from "../../../components/section";
import {Row, Col} from "react-grid-system"
import Title from "../../../components/ui/title";
import {useStore} from "../../../store";
import {get} from "lodash";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import Button from "../../../components/ui/button";
import Flex from "../../../components/flex";
import {PlusCircle} from "react-feather";
import GridView from "../../../containers/grid-view";
import {isArray} from "lodash";
import Badge from "../../../components/ui/badge";

const ComputersListContainer = () => {
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
            title: 'Компьютеры',
            path: '#',
        }
    ], [])


    const columns = [
        {
            title: '№',
            render: (th, tr, index, offset) => offset + index + 1
        },
        {
            title: 'Название компьютера',
            dataIndex: 'pcName'
        },
        {
            title: 'Количество сотрудников',
            dataIndex: 'employees',
            render: (th) => th?.length,
            width: 150
        },
        {
            title: 'Сотрудники',
            dataIndex: 'employees',
            render: (th) => isArray(th) && th?.length > 0 && th.map(({hostname}) => hostname).join(" "),
        },
        {
            title: 'ОС',
            dataIndex: 'os'
        },
        {
            title: 'MAC-адрес',
            dataIndex: 'macAddress',
        },
        {
            title: 'IP-адрес',
            dataIndex: 'ipAddress',
        },
        {
            title: 'Версия агента',
            dataIndex: 'agentVersion',
        },
        {
            title: 'Под контролем',
            dataIndex: 'isMonitored',
            render: (th) => <Badge success={th} danger={!th}>{th ? "ДА" : "НЕТ"}</Badge>
        },
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    return (
        <Section>
            <Row className={'mb-15'}>
                <Col xs={8}>
                    <Title>Компьютеры</Title>
                </Col>
            </Row>
            <GridView
                hideGridHeader
                url={URLS.computers}
                keyId={KEYS.computers}
                tableHeaderData={columns}
                params={{}}
                hideTimeline
                source={'data.data.computers'}
            />

        </Section>
    );
};

export default ComputersListContainer;