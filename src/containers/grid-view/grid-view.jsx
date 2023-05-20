import React, {useState, memo, useEffect} from 'react';
import styled from "styled-components";
import {
    usePaginateQuery,
} from "../../hooks/api";
import {ceil, get, isNil} from "lodash";
import {OverlayLoader} from "../../components/loader";
import GridViewHeader from "./components/grid-view-header";
import GridViewTimeline from "./components/grid-view-timeline";
import GridViewTable from "./components/grid-view-table";
import GridViewPagination from "./components/grid-view-pagination";
import ErrorPage from "../../modules/auth/pages/ErrorPage";
import {useStore} from "../../store";
import Modal from "../../components/modal";


const Styled = styled.div`
  min-height: 80vh;
`;
const GridView = ({
                      headerComponent = null,
                      tableHeaderData = [],
                      tableBodyData = [],
                      keyId,
                      url,
                      viewUrl = null,
                      params = null,
                      hideTimeline = false,
                      source = 'data.data.result',
                      ...rest
                  }) => {

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [search, handleSearch] = useState('');

    const {data, isError, isLoading, isFetching} = usePaginateQuery({
        key: keyId,
        url,
        params: {...params, take: limit, skip: page * limit, search: `${search}`},
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

    if (isError) {
        return <ErrorPage/>;
    }
    return (
        <Styled {...rest}>
            <GridViewHeader headerComponent={headerComponent} handleSearch={handleSearch}/>
            {!hideTimeline && <GridViewTimeline/>}
            {
                isFetching && <OverlayLoader/>
            }
            <GridViewTable offset={page * limit} viewUrl={viewUrl} tableHeaderData={tableHeaderData}
                           tableBodyData={get(data, source, [])}/>
            <GridViewPagination limit={limit} pageCount={ceil(get(data, "data.data.total") / limit) || 0}
                                setPage={setPage}
                                setLimit={setLimit}/>
        </Styled>
    );
};

export default memo(GridView);