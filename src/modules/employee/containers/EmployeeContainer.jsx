import React, {useEffect, useMemo} from 'react';
import {useStore} from "../../../store";
import {get} from "lodash";
import GridView from "../../../containers/grid-view";
import {URLS} from "../../../constants/url";
import {KEYS} from "../../../constants/key";
import dayjs from "dayjs";
import Flex from "../../../components/flex";
import GridViewHeader from "../../../containers/grid-view/components/grid-view-header";


const EmployeeContainer = ({id = null, ...rest}) => {
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const dateRange = useStore(state => get(state, 'dateRange', null))
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
            title: 'Журнал активности',
            path: '#',
        }
    ], [])

    const columns = [
        {
            title: '№',
            dataIndex: 'title',
            render: (th, tr, index, offset) => offset + index + 1
        },
        {
            title: 'Дата и время',
            dataIndex: 'datetime',
            render: (th) => dayjs(th).format("DD-MM-YYYY HH:mm")
        },
        {
            title: 'Название процесса',
            dataIndex: 'process',
            render: (th, tr) => <Flex justify={'center'}><img src={`data:image/png;base64, ${get(tr, 'icon')}`} alt=""/>
                <span className={'ml-10'}>{th}</span></Flex>
        },
        {
            title: 'Название',
            dataIndex: 'title',
            width: 350
        },
        {
            title: 'Продолжительность',
            dataIndex: 'time',
            render: (th) => dayjs(th).format("HH:mm:ss"),
        },
        {
            title: 'Название компьютера',
            dataIndex: 'pcname',
            render: (th, tr) => get(tr, 'computer.pcname')
        }
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    return (
        <>
            <GridViewHeader/>
            <GridView
                url={URLS.activity}
                keyId={KEYS.activity}
                params={{employeeId: id, start: get(dateRange, 'startDate'), end: get(dateRange, 'startDate')}}
                tableHeaderData={columns}
            />
        </>
    );
};

export default EmployeeContainer;