import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import {Col, Container, Row} from "react-grid-system";
import GridView from "../../../containers/grid-view";


const EmployeeProfileContainer = ({...rest}) => {
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
            title: 'Сотрудники',
            path: '/employees',
        },
        {
            id: 3,
            title: 'Активные приложения',
            path: '#',
        }
    ], [])

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])
    return (
        <Container fluid>
            <Row>
                <Col xs={2}></Col>
                <Col xs={10}>
                    <GridView/>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeeProfileContainer;