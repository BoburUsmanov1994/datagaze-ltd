import React, {useEffect, useMemo, useState} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import GridViewHeader from "../../../containers/grid-view/components/grid-view-header";
import GridViewTimeline from "../../../containers/grid-view/components/grid-view-timeline";
import VerticalTimelineComponent from "../../../components/vertical-timeline/inde";
import {useTranslation} from "react-i18next";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";

const ScreenshotListContainer = ({
                                     id = null,
                                 }) => {
    const [search, setSearch] = useState('')
    const {t} = useTranslation()
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))


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
            <GridViewHeader handleSearch={(val) => setSearch(val)} headerComponent={<><GridViewCalendar/></>}/>
            <GridViewTimeline/>
            <VerticalTimelineComponent search={search} id={id}/>
        </>
    );
};

export default ScreenshotListContainer;