import React, {useEffect, useState} from 'react';
import {useStore} from "../../../store";
import {get, isEmpty} from "lodash";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import dayjs from "dayjs";
import Flex from "../../../components/flex";
import GridViewCalendar from "../../../containers/grid-view/components/grid-view-calendar";
import {useTranslation} from "react-i18next";
import {Col, Container, Row} from "react-grid-system";
import Search from "../../../components/search";
import ActivityCalendar from "../components/ActivityCalendar";
import Select from "../../../components/select";


const EmployeeContainer = ({id = null}) => {
    const {t} = useTranslation()
    const [search, handleSearch] = useState('')
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const dateRange = useStore(state => get(state, 'dateRange', null));
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
            title: t('Журнал активности'),
            path: '#',
        }
    ];

    const columns = [
        {
            title: '№',
            dataIndex: 'title',
            render: (th, tr, index, offset) => offset + index + 1
        },

        {
            title: t('Название процесса'),
            dataIndex: 'process',
            render: (th, tr) => <Flex justify={'center'}><img src={`data:image/png;base64, ${get(tr, 'icon')}`} alt=""/>
                <span className={'ml-10'}>{th}</span></Flex>
        },
        {
            title: t('Название'),
            dataIndex: 'activeWindowName',
            width: 350
        },
        {
            title: t('Название компьютера'),
            dataIndex: 'computer',
            render: (th, tr) => get(tr, 'computer.pcName')
        },
        {
            title: t('Дата и время'),
            dataIndex: 'dateTime',
            render: (th) => dayjs(th).format("DD-MM-YYYY HH:mm")
        },
        {
            title: t('Продолжительность'),
            dataIndex: 'time',
            render: (th) => th,
        },
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    return (
        <><Container className={'gridview__header__container'} fluid>
            <Row align={"center"}>
                <Col xs={9} className={'gridview__header'}>
                    <GridViewCalendar/>
                    <Select className={'ml-20'} isMulti property={{
                        placeholder: t('Categories'),
                        onChange: (val) => console.log(prev => ({...prev, rule: val?.map(({value}) => value)}))
                    }} options={[]}/>
                </Col>
                <Col xs={3}>
                    <Search handleSearch={handleSearch}/>
                </Col>
            </Row>
        </Container>
            <ActivityCalendar id={id} dateRange={dateRange}/>
        </>
    );
};

export default EmployeeContainer;