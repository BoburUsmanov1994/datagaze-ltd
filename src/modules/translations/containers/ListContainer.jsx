import React, {useEffect, useMemo, useState} from 'react';
import {useStore} from "../../../store";
import {get, isNil} from "lodash";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import {useTranslation} from "react-i18next";
import {Edit2, Trash2} from "react-feather";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import Modal from "../../../components/modal";
import Form from "../../../containers/form/form";
import Field from "../../../containers/form/field";
import {useGetOneQuery, usePatchQuery} from "../../../hooks/api";
import {ContentLoader} from "../../../components/loader";
import Button from "../../../components/ui/button";

const ListContainer = () => {
    const {t} = useTranslation()
    const [filter, setFilter] = useState({isOnline: false})
    const [id, setId] = useState(null)
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const {data, isLoading} = useGetOneQuery({
        id,
        key: KEYS.translations,
        url: URLS.translations,
        params: {
            id
        },
        enabled: !!(id)
    })

    const {mutate: updateRequest, isLoading: isLoadingUpdate} = usePatchQuery({listKeyId: KEYS.translations});

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
        {
            title: t("Actions"),
            dataIndex: 'id',
            render: (th) => <>
                <Edit2 onClick={(id) => setId(th)} size={20} color={'#FEC83C'}/>
            </>
        },

    ]

    const update = ({data: attrs}) => {
        updateRequest({
                url: `${URLS.translations}/${id}`,
                attributes: attrs
            }, {
                onSuccess: () => {
                    setId(null)
                }
            }
        )
    }

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    return (
        <>
            <Modal open={!!(id)} onClose={() => setId(null)}>
                {
                    (isLoading || isLoadingUpdate) && <ContentLoader/>
                }
                <Form formRequest={(params) => update(params)} footer={<><Button primary block>{t('Edit')}</Button></>}>
                    <Field type={'input'} name={'key'} property={{disabled: true}}
                           defaultValue={get(data, 'data.data.key')}/>
                    <Field type={'input'} name={'uz'} defaultValue={get(data, 'data.data.uz')}/>
                    <Field type={'input'} name={'en'} defaultValue={get(data, 'data.data.en')}/>
                    <Field type={'input'} name={'ru'} defaultValue={get(data, 'data.data.ru')}/>
                </Form>
            </Modal>
            <GridView
                headerComponent={<>
                    <GridViewCalendar/>
                </>}
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