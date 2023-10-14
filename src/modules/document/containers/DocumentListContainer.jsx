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

const DocumentListContainer = () => {
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Sector DLP',
            path: '/',
        },
        {
            id: 2,
            title: 'Documents',
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
            width:300
        },
        {
            title: 'Sensitivity',
            dataIndex: 'sensitivity',
            width:200
        },
        {
            title: 'Frequency',
            dataIndex: 'frequency',
            width:200
        },
        {
            title: 'Words',
            dataIndex: 'words',
            render: (th) => <div>
                {
                    th.map(item=><span style={{marginRight:'5px',display:'inline-block',marginBottom:'15px'}}><Badge  success>{item}</Badge></span> )
                }
            </div>
        },
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    return (
        <Section>
            <Row className={'mb-15'}>
                <Col xs={8}>
                    <Title>Documents</Title>
                </Col>
            </Row>
            <GridView
                hideGridHeader
                url={URLS.documents}
                keyId={KEYS.documents}
                tableHeaderData={columns}
                params={{}}
                hideTimeline
                source={'data.data.documents'}
            />

        </Section>
    );
};

export default DocumentListContainer;