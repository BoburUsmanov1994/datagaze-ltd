import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get, isEmpty} from "lodash";
import GridViewHeader from "../../../containers/grid-view/components/grid-view-header";
import GridViewTimeline from "../../../containers/grid-view/components/grid-view-timeline";
import VerticalTimelineComponent from "../../../components/vertical-timeline/inde";
import {useTranslation} from "react-i18next";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import {Col, Container, Row} from "react-grid-system";
import Search from "../../../components/search";
import dayjs from "dayjs";

const ScreenshotListContainer = ({
                                     id = null,
                                 }) => {
    const {t} = useTranslation()
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))

    const dateRange = useStore(state => get(state, 'dateRange', null));
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: t('Datagaze DLP'),
            path: '/',
        },
        {
            id: 2,
            title: t('Сотрудники'),
            path: '/employee',
        },
        {
            id: 3,
            title: t('Скриншоты'),
            path: '#',
        }
    ], [])


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
                        <Search handleSearch={()=>{}}/>
                    </Col>
                </Row>
            </Container>
            {!isEmpty(dateRange) && (dayjs(get(dateRange, 'startDate')).isSame(get(dateRange, 'endDate'), 'day')) &&
                <GridViewTimeline/>}
            <VerticalTimelineComponent id={id}/>
        </>
    );
};

export default ScreenshotListContainer;