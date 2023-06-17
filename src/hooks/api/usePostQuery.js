import React from 'react';
import {useMutation, useQueryClient} from 'react-query'
import {request} from "../../services/api";
import {toast} from "react-toastify";
import {get, isArray, forEach} from "lodash";

const postRequest = (url, attributes) => request.post(url, attributes);

const usePostQuery = ({hideSuccessToast = false, listKeyId = null}) => {


        const queryClient = useQueryClient();

        const {mutate, isLoading, isError, error, isFetching} = useMutation(
            ({
                 url, attributes
             }) => postRequest(url, attributes),
            {
                onSuccess: (data) => {
                    if (!hideSuccessToast) {
                        toast.success(data?.data?.message || 'SUCCESS')
                    }

                    if (listKeyId) {
                        queryClient.invalidateQueries(listKeyId)
                    }
                },
                onError: ({response}) => {
                    if (isArray(get(response, 'data.message'))) {
                        forEach(get(response, 'data.message'), (msg) => {
                            toast.error(msg || 'ERROR')
                        })
                    } else {
                        toast.error(response?.data?.message || 'ERROR')
                    }
                }
            }
        );

        return {
            mutate,
            isLoading,
            isError,
            error,
            isFetching,
        }
    }
;

export default usePostQuery;