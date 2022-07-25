import React, {useState, memo} from 'react';
import styled from "styled-components";
import {
    usePaginateQuery,
} from "../../hooks/api";
import ErrorPage from "../../modules/auth/pages/ErrorPage";
import {OverlayLoader} from "../../components/loader";
import GridViewHeader from "./components/grid-view-header";
import GridViewTimeline from "./components/grid.view-timeline";
import GridViewTable from "./components/grid-view-table";
import GridViewPagination from "./components/grid-view-pagination";


const Styled = styled.div`

`;
const GridView = ({
                      tableHeaderData = [],
                      title = '',
                      keyId,
                      url,
                      ...rest
                  }) => {

    const [page, setPage] = useState(1)
    const {data, isError, isLoading, isFetching} = usePaginateQuery({key: keyId, url, page})


    if (isLoading) {
        return <OverlayLoader/>
    }

    if (isError) {
        // return <ErrorPage/>
    }
    return (
        <Styled {...rest}>
            <GridViewHeader/>
            <GridViewTimeline/>
            <GridViewTable/>
            <GridViewPagination/>
        </Styled>
    );
};

export default memo(GridView);