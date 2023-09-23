import React, {useEffect, useMemo, useState} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import GridViewHeader from "../../../containers/grid-view/components/grid-view-header";
import GridViewTimeline from "../../../containers/grid-view/components/grid-view-timeline";
import VerticalTimelineComponent from "../../../components/vertical-timeline/inde";
import {useTranslation} from "react-i18next";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import dayjs from "dayjs";
import Select from "../../../components/select";

const ScreenshotListContainer = ({
                                     id = null,
                                 }) => {
    const [search, setSearch] = useState('')
    const {t} = useTranslation()
    const dateRange = useStore(state => get(state, 'dateRange', null))
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
            <GridViewHeader handleSearch={(val) => setSearch(val)}
                            headerComponent={<><GridViewCalendar/> <Select className={'ml-20'} isMulti property={{
                                placeholder: t('Categories'),
                                onChange: (val) => console.log(prev => ({...prev, rule: val?.map(({value}) => value)}))
                            }} options={[]}/></>}/>
            {(dayjs(get(dateRange, 'startDate')).isSame(get(dateRange, 'endDate'), 'day')) && <GridViewTimeline/>}
            <VerticalTimelineComponent search={search} id={id}/>
        </>
    );
};

export default ScreenshotListContainer;