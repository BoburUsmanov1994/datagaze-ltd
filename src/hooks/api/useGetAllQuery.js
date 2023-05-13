import React from 'react';
import {useQuery} from 'react-query'
import {request} from "../../services/api";
import {toast} from "react-toastify";

const useGetAllQuery = ({
                            key = "get-all",
                            url = "/",
                            params = {},
                            headers = {},
                            enabled = true,
                            showSuccessMsg = false,
                            hideErrorMsg = false,
                            removeAfterUnmount = false,
                            cb = {
                                success: () => {
                                },
                                fail: () => {
                                }
                            },
                        }) => {

    const {isLoading, isError, data, error, isFetching} = useQuery([key, params], () => request.get(url, {
        headers,
        params
    }), {
        onSuccess: ({data: response}) => {
            cb?.success(response)
        },
        onError: (data) => {
            cb?.fail()
            if (!hideErrorMsg) {
                toast.error(data?.response?.data?.message || `ERROR!!! api not working`)
            }
        },
        enabled,
        removeAfterUnmount
    });

    return {
        isLoading,
        isError,
        data,
        error,
        isFetching
    }
};

export default useGetAllQuery;