import React, {useState, memo, useEffect} from 'react';
import styled from "styled-components";
import {
    usePaginateQuery,
} from "../../hooks/api";
import {ceil, get} from "lodash";
import {OverlayLoader} from "../../components/loader";
import GridViewHeader from "./components/grid-view-header";
import GridViewTimeline from "./components/grid-view-timeline";
import GridViewTable from "./components/grid-view-table";
import GridViewPagination from "./components/grid-view-pagination";


const Styled = styled.div`
  min-height: 80vh;
`;
const GridView = ({
                      tableHeaderData = [],
                      tableBodyData = [],
                      keyId,
                      url,
                      viewUrl,
                      ...rest
                  }) => {

    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(0);
    // ?start=&end=&offset=0&limit=10&deleted=&monitored=&online=&groups=&search=
    const {data, isError, isLoading, isFetching} = usePaginateQuery({
        key: keyId,
        url,
        page,
        limit,
        params: {limit, offset: page * limit}
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
        return "Error ...";
    }
    return (
        <Styled {...rest}>
            <GridViewHeader/>
            <GridViewTimeline/>
            {
                isFetching && <OverlayLoader/>
            }
            <GridViewTable viewUrl={viewUrl} tableHeaderData={tableHeaderData} tableBodyData={get(data, "data.docs", [])}/>
            <GridViewPagination pageCount={ceil(get(data, "data.total") / limit)} setPage={setPage}
                                setLimit={setLimit}/>
        </Styled>
    );
};

export default memo(GridView);