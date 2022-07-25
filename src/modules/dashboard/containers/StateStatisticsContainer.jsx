import React,{useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import Section from "../../../components/section";
import {Col, Row} from "react-grid-system";

const StateStatisticsContainer = ({
                                      ...rest
                                  }) => {
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Список гос. органов',
            path: '/state-organization-statistics',
        }
    ], [])

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])
    return (
        <Section>
            <Row>
                <Col xs={12}>Список гос. органов</Col>
            </Row>
        </Section>
    );
};

export default StateStatisticsContainer;