import React from 'react';
import {useQuery} from 'react-query'
import {request} from "../../services/api";
import {toast} from "react-toastify";

const usePaginateQuery = ({
                              key = "get-all",
                              url = "/",
                              params = {},
                              showSuccessMsg = false,
                              showErrorMsg = false,
                              enabled = true,
                          }) => {

    const {
        isLoading,
        isError,
        data,
        error,
        isFetching
    } = useQuery([key, params], () => request.get(`${url}`, {params}), {
        keepPreviousData: true,
        onSuccess: () => {
            if (showSuccessMsg) {
                toast.success('SUCCESS')
            }
        },
        onError: (data) => {
            if (showErrorMsg) {
                toast.error(data?.response?.data?.message || `ERROR`)
            }
        },
        enabled
    });

    return {
        isLoading,
        isError,
        data,
        error,
        isFetching
    }
};

export default usePaginateQuery;