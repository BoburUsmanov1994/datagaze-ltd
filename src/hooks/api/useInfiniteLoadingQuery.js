import React from 'react';
import {useQuery} from 'react-query'
import {request} from "../../services/api";

const UseInfiniteLoadingQuery = ({
                                     key = "get-all",
                                     url = "/",
                                     params = {},
                                 }) => {

    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useQuery([key],
        async () => {
            const res = await request.get(url, {params})
            return res.data
        },
        {
            // getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
            // getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
        },
    );
    console.log(
        'infinite',
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage
    )
    return {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    }
};

export default UseInfiniteLoadingQuery;