import React, {useState, memo, useEffect} from 'react';
import styled from "styled-components";
import {
    usePaginateQuery,
} from "../../hooks/api";
import {ceil, get, isEmpty, isEqual, isNil} from "lodash";
import {OverlayLoader} from "../../components/loader";
import GridViewHeader from "./components/grid-view-header";
import GridViewTimeline from "./components/grid-view-timeline";
import GridViewTable from "./components/grid-view-table";
import GridViewPagination from "./components/grid-view-pagination";
import GridViewCalendar from "./components/grid-view-calendar";
import {useStore} from "../../store";
import dayjs from "dayjs";


const Styled = styled.div`
  min-height: 80vh;
`;
const GridView = ({
                      headerComponent = <GridViewCalendar/>,
                      tableHeaderData = [],
                      tableBodyData = [],
                      keyId,
                      url,
                      viewUrl = null,
                      params = null,
                      hideTimeline = false,
                      source = 'data.data.result',
                      hideGridHeader = false,
                      bordered = false,
                      tableHeadDark = false,
                      ...rest
                  }) => {

    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(0);
    const [search, handleSearch] = useState('');
    const dateRange = useStore(state => get(state, 'dateRange', null));

    const {data, isLoading, isFetching} = usePaginateQuery({
        key: keyId,
        url,
        params: {
            search: `${search}`,
            ...params,
            take: limit,
            skip: page * limit,
        },
        enabled: !isNil(params)
    })

    useEffect(() => {
        if (page) {
            setPage(0)
        }
    }, [limit])


    if (isLoading) {
        return <OverlayLoader/>
    }
    return (
        <Styled {...rest}>
            {!hideGridHeader && <GridViewHeader headerComponent={headerComponent} handleSearch={handleSearch}/>}
            {!isEmpty(dateRange) && !hideTimeline && (dayjs(get(dateRange, 'startDate')).isSame(get(dateRange, 'endDate'), 'day')) &&
                <GridViewTimeline/>}
            {
                isFetching && <OverlayLoader/>
            }
            <GridViewTable tableHeadDark={tableHeadDark} bordered={bordered} offset={page * limit} viewUrl={viewUrl}
                           tableHeaderData={tableHeaderData}
                           tableBodyData={get(data, source, [])}/>
            <GridViewPagination limit={limit} pageCount={ceil(get(data, "data.data.total") / limit) || 0}
                                setPage={setPage}
                                setLimit={setLimit}/>
        </Styled>
    );
};

export default memo(GridView);