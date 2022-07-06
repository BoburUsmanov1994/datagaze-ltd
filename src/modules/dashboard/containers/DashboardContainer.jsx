import React, {useEffect, useMemo} from 'react';
import {get} from "lodash";
import {useStore} from "../../../store";
import Section from "../../../components/section";
import {Col, Row} from "react-grid-system";


const DashboardContainer = ({...rest}) => {
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Dashboard',
            path: '/dashboard',
        }
    ], [])

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    return (
        <Section>
            <Row>
                <Col xs={12} style={{marginBottom: '150px'}}>
                   Dashboard
                </Col>
            </Row>
        </Section>
    );
};

export default DashboardContainer;