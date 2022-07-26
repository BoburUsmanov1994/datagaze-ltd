import React, {useState, memo} from 'react';
import styled from "styled-components";
import {
    usePaginateQuery,
} from "../../hooks/api";
import {OverlayLoader} from "../../components/loader";
import GridViewHeader from "./components/grid-view-header";


const Styled = styled.div`
  min-height: 80vh;
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
        </Styled>
    );
};

export default memo(GridView);