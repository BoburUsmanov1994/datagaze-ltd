import React from 'react';
import {useQuery} from 'react-query'
import {request} from "../../services/api";
import {toast} from "react-toastify";

const useGetAllQuery = ({
                            key = "get-all",
                            url = "/",
                            params = {},
                            showSuccessMsg = false,
                            hideErrorMsg = false
                        }) => {

    const {isLoading, isError, data, error, isFetching} = useQuery(key, () => request.get(url, params), {
        onSuccess: () => {
        },
        onError: (data) => {
            if(!hideErrorMsg) {
                toast.error(data?.response?.data?.message || `ERROR!!! api not working`)
            }
        }
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