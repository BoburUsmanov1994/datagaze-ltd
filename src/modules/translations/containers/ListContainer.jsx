import React, {useEffect, useMemo, useState} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import {useTranslation} from "react-i18next";

const ListContainer = () => {
    const {t} = useTranslation()
    const [filter, setFilter] = useState({isOnline: false})
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: t('Datagaze DLP'),
            path: '/',
        },
        {
            id: 2,
            title: t('Translations'),
            path: '#',
        },
    ], [])
    const columns = [
        {
            title: "№",
            render: (th, tr, index, offset) => <>{offset + index + 1}</>
        },
        {
            title: t("Key"),
            dataIndex: 'key',
        },
        {
            title: t("Uz"),
            dataIndex: 'uz',
        },
        {
            title: t("Ru"),
            dataIndex: 'ru',
        },
        {
            title: t("En"),
            dataIndex: 'en',
        },

    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    return (
        <>
            <GridView
                hideTimeline
                url={URLS.translations}
                keyId={KEYS.translations}
                params={filter}
                source={'data.data.data'}
                tableHeaderData={
                    columns
                }
            />
        </>
    );
};

export default ListContainer;