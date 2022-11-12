import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get, isNil} from "lodash";
import dayjs from "dayjs";
import Flex from "../../../components/flex";
import GridViewHeader from "../../../containers/grid-view/components/grid-view-header";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import {usePaginateQuery} from "../../../hooks/api";
import {OverlayLoader} from "../../../components/loader";
import {Navigate} from "react-router-dom";
import GridViewTimeline from "../../../containers/grid-view/components/grid-view-timeline";
import VerticalTimelineComponent from "../../../components/vertical-timeline/inde";

const ScreenshotListContainer = ({
                                     id = null,
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
            title: 'Сотрудники',
            path: '/employee',
        },
        {
            id: 3,
            title: 'Скриншоты',
            path: '#',
        }
    ], [])


    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    return (
        <>
            <GridViewHeader/>
            <GridViewTimeline />
            <VerticalTimelineComponent id={id}  />
        </>
    );
};

export default ScreenshotListContainer;