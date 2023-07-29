import React, {useEffect, useState} from 'react';
import {useStore} from "../../store";
import {ceil, get, isNil} from "lodash";
import {usePaginateQuery} from "../../hooks/api";
import {OverlayLoader} from "../../components/loader";
import GridViewPagination from "../grid-view/components/grid-view-pagination";
import {Row, Col} from "react-grid-system";
import ListViewCard from "./components/list-view-card";
import Checkbox from "rc-checkbox";

const ListView = ({
                      keyId,
                      url,
                      viewUrl = null,
                      params = null,
                      source = 'data.data.result',
                      bordered = false,
                      hasCheckbox = false,
                      colSpan = 3,
                      ...rest
                  }) => {
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(0);
    const [search, handleSearch] = useState('');
    const dateRange = useStore(state => get(state, 'dateRange', null))

    const {data, isLoading, isFetching} = usePaginateQuery({
        key: keyId,
        url,
        params: {
            ...params,
            take: limit,
            skip: page * limit,
            search: `${search}`,
            start: get(dateRange, 'startDate'),
            end: get(dateRange, 'endDate')
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
        <div>
            <Row gutterWidth={40} className={'mb-25 mt-25'}>
                {get(data, source, []).map((item) => <Col xs={colSpan}>
                    <ListViewCard key={get(item, 'id')}
                                  data={item}/></Col>)}
            </Row>
            <GridViewPagination limit={limit} pageCount={ceil(get(data, "data.data.total") / limit) || 0}
                                setPage={setPage}
                                setLimit={setLimit}/>
        </div>
    );
};

export default ListView;