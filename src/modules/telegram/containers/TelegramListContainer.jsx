import React, {useEffect, useMemo, useState} from 'react';
import {useStore} from "../../../store";
import {get, isEmpty, isNil} from "lodash";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import {useTranslation} from "react-i18next";
import {Col, Container, Row} from "react-grid-system";
import Search from "../../../components/search";
import TelegramChat from "../components/TelegramChat";
import {usePaginateQuery} from "../../../hooks/api";

const TelegramListContainer = ({
                                   id = null,
                               }) => {
    const [search, handleSearch] = useState('');
    const [owner, setOwner] = useState(null);
    const {t} = useTranslation()
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const dateRange = useStore(state => get(state, 'dateRange', null))

    const {data: chats} = usePaginateQuery({
        key: [KEYS.telegramChat, get(owner, 'id')],
        url: URLS.telegramChat,
        params: {
            search: `${search}`,
            employeeId: id,
            ownerId: get(owner, 'id'),
            take: 100,
            skip: 0,
        },
        enabled: !isNil(get(owner, 'id') && id)
    })

    const breadcrumbs = [
        {
            id: 1,
            title: t('Sector DLP'),
            path: '/',
        },
        {
            id: 2,
            title: t('Сотрудники'),
            path: '/employees',
        },
        {
            id: 3,
            title: t('Телеграм'),
            path: '#',
        }
    ];

    const columns = [
        {
            title: '№',
            render: (th, tr, index, offset) => offset + index + 1
        },

        {
            title: t('Name'),
            dataIndex: 'name',
            width: 200
        },
        {
            title: t('Phone'),
            dataIndex: 'phone',
        },
        {
            title: t('Username'),
            dataIndex: 'username',
        },
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    return (
        <>
            <Container className={'gridview__header__container'} fluid>
                <Row align={"center"}>
                    <Col xs={9} className={'gridview__header'}>
                        <GridViewCalendar/>
                    </Col>
                    <Col xs={3}>
                        <Search />
                    </Col>
                </Row>
            </Container>
            {!isEmpty(dateRange) && <GridView
                hideGridHeader
                url={URLS.telegramOwner}
                keyId={KEYS.telegramOwner}
                params={{employeeId: id, search}}
                tableHeaderData={columns}
                onRowClick={(tr) => setOwner(tr)}
            />}
            <TelegramChat search={search} getSearchByChat={handleSearch} dateRange={dateRange} id={id} owner={owner}
                          chats={get(chats, 'data.data.result', [])} open={!isNil(owner)}
                          onClose={() => setOwner(null)}/>
        </>
    );
};

export default TelegramListContainer;