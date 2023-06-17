import React, {useEffect, useMemo} from 'react';
import Section from "../../../components/section";
import {Row, Col} from "react-grid-system"
import Title from "../../../components/ui/title";
import {useStore} from "../../../store";
import {get} from "lodash";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import GridView from "../../../containers/grid-view";
import Badge from "../../../components/ui/badge";

const RuleListContainer = () => {
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
            title: 'Rules',
            path: '#',
        }
    ], [])


    const columns = [
        {
            title: '№',
            render: (th, tr, index, offset) => offset + index + 1
        },
        {
            title: 'Название',
            dataIndex: 'name',
            width: 300
        },
        {
            title: 'Modules',
            dataIndex: 'modules',
            render: (th) => <ul>
                {th.map(_item => <li>{get(_item, 'name')}</li>)}
            </ul>
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    return (
        <Section>
            <Row className={'mb-15'}>
                <Col xs={8}>
                    <Title>Rules</Title>
                </Col>
            </Row>
            <GridView
                hideGridHeader
                url={URLS.rules}
                keyId={KEYS.rules}
                tableHeaderData={columns}
                params={{}}
                hideTimeline
                source={'data.data.rules'}
            />

        </Section>
    );
};

export default RuleListContainer;