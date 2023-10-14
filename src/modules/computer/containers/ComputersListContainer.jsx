import React, {useEffect, useMemo, useState} from 'react';
import Section from "../../../components/section";
import {Row, Col} from "react-grid-system"
import Title from "../../../components/ui/title";
import {useStore} from "../../../store";
import {get} from "lodash";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import Button from "../../../components/ui/button";
import Flex from "../../../components/flex";
import {PlusCircle, Power, RefreshCcw, RefreshCw, Trash2, X} from "react-feather";
import GridView from "../../../containers/grid-view";
import {isArray} from "lodash";
import Badge from "../../../components/ui/badge";
import Template from "../../../components/template";
import ListView from "../../../containers/list-view";
import {useTranslation} from "react-i18next";

const ComputersListContainer = () => {
    const [open, setOpen] = useState(false);
    const [template, setTemplate] = useState('list');
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const {t} = useTranslation()
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Sector DLP',
            path: '/',
        },
        {
            id: 2,
            title: 'Компьютеры',
            path: '#',
        }
    ], [])


    const columns = [
        {
            title: '№',
            render: (th, tr, index, offset) => offset + index + 1
        },
        {
            title: 'Название компьютера',
            dataIndex: 'pcName'
        },
        {
            title: 'Количество сотрудников',
            dataIndex: 'employees',
            render: (th) => th?.length,
            width: 150
        },
        {
            title: 'Сотрудники',
            dataIndex: 'employees',
            render: (th) => isArray(th) && th?.length > 0 && th.map(({hostname}) => hostname).join(" "),
        },
        {
            title: 'ОС',
            dataIndex: 'os'
        },
        {
            title: 'MAC-адрес',
            dataIndex: 'macAddress',
        },
        {
            title: 'IP-адрес',
            dataIndex: 'ipAddress',
        },
        {
            title: 'Версия агента',
            dataIndex: 'agentVersion',
        },
        {
            title: 'Под контролем',
            dataIndex: 'isMonitored',
            render: (th) => <Badge success={th} danger={!th}>{th ? "ДА" : "НЕТ"}</Badge>
        },
    ]

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    return (
        <Section>
            <Row className={'mb-15'}>
                <Col xs={12}>
                    <Row align={'center'} className={'mb-25'}>
                        <Col xs={2}>
                            <Title>Компьютеры</Title>
                        </Col>
                        <Col xs={10} className={'text-right '}>
                            <Flex justify={'flex-end'}>
                                {/*<Button primary className={'mr-20'} rounded><Flex><RefreshCw size={18}*/}
                                {/*                                                             className={'mr-10'}/><span>{t("Перезапустить агента")}</span></Flex></Button>*/}
                                <Button brown className={'mr-20'} rounded><Flex><X size={18}
                                                                                   className={'mr-10'}/><span>{t("Очистить агента")}</span></Flex></Button>
                                <Button danger className={'mr-20'} rounded><Flex><Trash2 size={18}
                                                                                         className={'mr-10'}/><span>{t("Удалить агента")}</span></Flex></Button>
                                <Button blue className={'mr-20'} rounded><Flex><RefreshCcw size={18}
                                                                                           className={'mr-10'}/><span>{t("Перезагрузить")}</span></Flex></Button>
                                <Button gray className={'mr-20'} rounded><Flex><Power size={18}
                                                                                      className={'mr-10'}/><span>{t("Выключить")}</span></Flex></Button>

                                <Button onClick={() => setOpen(true)} primary rounded><Flex><PlusCircle size={18}
                                                                                                        className={'mr-10'}/><span>{t("Добавить новый компьютер")}</span></Flex></Button>
                                <Template getTemplate={setTemplate}/>
                            </Flex>
                        </Col>
                    </Row>
                </Col>

                <Col xs={12}>
                    {template == 'list' ?
                        <ListView
                            source={'data.data.computers'}
                            url={URLS.computers}
                            keyId={KEYS.computers}
                            params={{}}
                            hasCheckbox
                        /> :
                        <GridView
                            tableHeadDark
                            bordered
                            hideGridHeader
                            url={URLS.computers}
                            keyId={KEYS.computers}
                            tableHeaderData={columns}
                            params={{}}
                            hideTimeline
                            source={'data.data.computers'}
                        />}

                </Col>
            </Row>

        </Section>
    );
};

export default ComputersListContainer;