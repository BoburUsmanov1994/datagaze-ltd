import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get, head} from "lodash";
import dayjs from "dayjs";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import GridViewHeader from "../../../containers/grid-view/components/grid-view-header";
import config from "../../../config";

const CloudStorageListContainer = ({
                                       id
                                   }) => {
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Datagaze DLP',
            path: '/',
        },
        {
            id: 2,
            title: 'Сотрудники',
            path: '/employees',
        },
        {
            id: 3,
            title: 'Использование интернета',
            path: '#',
        },
        {
            id: 4,
            title: 'Облачное хранилище',
            path: '#',
        }
    ], [])

    const columns = [
        {
            title: '№',
            render: (th, tr, index, offset) => offset + index + 1
        },

        {
            title: 'Хост',
            dataIndex: 'host',
        },
        {
            title: 'Браузер',
            dataIndex: 'browser',
        },
        {
            title: 'Название компьютера',
            dataIndex: 'computer.pcName',
        },
        {
            title: 'Файл',
            dataIndex: 'files',
            render: (th) => <a target={'_blank'}
                               href={`${config.FILE_SERVER}${get(head(th), 'filePath')}`}>{get(head(th), 'fileName')}</a>,
        },
        {
            title: 'Дата и время',
            dataIndex: 'dateTime',
            render: (th) => dayjs(th).format("DD-MM-YYYY HH:mm"),
            width: 150
        },

    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])
    return (
        <>
            <GridViewHeader/>
            <GridView
                url={URLS.webSniffs}
                keyId={KEYS.webSniffs}
                params={{employeeId: id}}
                tableHeaderData={columns}
            />
        </>
    );
};

export default CloudStorageListContainer;