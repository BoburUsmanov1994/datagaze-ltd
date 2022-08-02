import React, {useEffect, useMemo} from 'react';
import {get} from "lodash";
import {useStore} from "../../../store";
import Section from "../../../components/section";
import {Col, Row} from "react-grid-system";
import Card from "../../../components/card";
import {AlertOctagon, Bell, Info, Monitor, Shield, Users} from "react-feather";
import Category from "../../../components/category";
import {CustomPieChart} from "../../../components/chart";
import DashboardBox from "../../../components/dashboard-box";
import EmployeeProfile from "../../../components/employee-profile";
import Progressbar from "../../../components/progress";
import {useGetAllQuery} from "../../../hooks/api";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";


const DashboardContainer = ({...rest}) => {
    let {data: topUsers} = useGetAllQuery({key: KEYS.topUsers, url: URLS.topUsers})
    let {data: kpd} = useGetAllQuery({key: KEYS.kpd, url: URLS.kpd})
    let {data: incidents} = useGetAllQuery({key: KEYS.incidents, url: URLS.incidents})
    let {data: incsByPeriod} = useGetAllQuery({key: KEYS.incsByPeriod, url: URLS.incsByPeriod})
    let {data: incsByType} = useGetAllQuery({key: KEYS.incsByType, url: URLS.incsByType})
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Статистика',
            path: '/dashboard',
        }
    ], [])

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    return (
        <Section>
            <Row>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Обнаруженные инциденты'} count={2} percent={12.5}
                          icon={<Bell color={'#8A8A8A'} size={28}/>}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Всего сотрудников'} count={123} percent={12.5}
                          icon={<Users color={'#8A8A8A'} size={28}/>}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Активные компьютеры'} count={123} percent={12.5}
                          icon={<Monitor color={'#8A8A8A'} size={28}/>}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Инциденты высокого уровня'} count={123} percent={12.5}
                          icon={<Shield color={'#8A8A8A'} size={28}/>}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Инциденты среднего уровня'} count={123} percent={12.5}
                          icon={<AlertOctagon color={'#8A8A8A'} size={28}/>}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Инциденты низкого уровня'} count={123} percent={12.5}
                          icon={<Info color={'#8A8A8A'} size={28}/>}/>
                </Col>
            </Row>
            <Row className={'mt-30'}>
                <Col xs={12} xxl={6} className={'mb-30'}>
                    <Row align={'center'}>
                        <Col xs={3}>
                            <Category color={'#4439C1'} percent={19.6} title={'YouTube'}/>
                            <Category color={'#F6749F'} percent={9} title={'Яндекс карты'}/>
                            <Category color={'#CD4472'} percent={3.5} title={'Google.com'}/>

                            <Category color={'#722774'} percent={7} title={'Gmail.com'} className={'mt-50'}/>
                            <Category color={'#8E499F'} percent={10} title={'mail.ru'}/>
                            <Category color={'#663D71'} percent={4.6} title={'1xbet.com'}/>

                            <Category color={'#AF5656'} percent={12} title={'Ijro.gov.uz'} className={'mt-50'}/>
                            <Category color={'#F86E6E'} percent={10} title={'App.ijro.uz'}/>
                            <Category color={'#F9B37F'} percent={18} title={'Lex.uz'}/>
                        </Col>
                        <Col xs={6}>
                            <CustomPieChart data={[
                                {name: 'YouTube', value: 19.6},
                                {name: 'Яндекс карты', value: 9},
                                {name: 'Google.com', value: 3.5},
                                {name: 'Gmail.com', value: 7}
                            ]} colors={['#4439C1', '#F6749F', '#CD4472', '#722774']}/>
                        </Col>
                        <Col xs={3}>
                            <Category color={'#4474B6'} percent={19.6} title={'Telegram.org'} right/>
                            <Category color={'#44B69A'} percent={9} title={'Виртуализация'} right/>
                            <Category color={'#409E6F'} percent={3.5} title={'radio.yandex.uz'} right/>

                            <Category color={'#15746E'} percent={7} title={'itv.uz'} right className={'mt-50'}/>
                            <Category color={'#47A6FF'} percent={7} title={'archive.uz'} right/>
                            <Category color={'#515061'} percent={4.6} title={'my.gov.uz'} right/>

                            <Category color={'#15746E'} percent={7} title={'itv.uz'} right className={'mt-50'}/>
                            <Category color={'#47A6FF'} percent={7} title={'archive.uz'} right/>
                            <Category color={'#515061'} percent={4.6} title={'my.gov.uz'} right/>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} xxl={6} className={'mb-30'}>
                    <Row align={'center'}>
                        <Col xs={3}>
                            <Category color={'#4439C1'} percent={19.6} title={'YouTube'}/>
                            <Category color={'#F6749F'} percent={9} title={'Яндекс карты'}/>
                            <Category color={'#CD4472'} percent={3.5} title={'Google.com'}/>

                            <Category color={'#722774'} percent={7} title={'Gmail.com'} className={'mt-50'}/>
                            <Category color={'#8E499F'} percent={10} title={'mail.ru'}/>
                            <Category color={'#663D71'} percent={4.6} title={'1xbet.com'}/>

                            <Category color={'#AF5656'} percent={12} title={'Ijro.gov.uz'} className={'mt-50'}/>
                            <Category color={'#F86E6E'} percent={10} title={'App.ijro.uz'}/>
                            <Category color={'#F9B37F'} percent={18} title={'Lex.uz'}/>
                        </Col>
                        <Col xs={6}>
                            <CustomPieChart data={[
                                {name: 'YouTube', value: 19.6},
                                {name: 'Яндекс карты', value: 9},
                                {name: 'Google.com', value: 3.5},
                                {name: 'Gmail.com', value: 7}
                            ]} colors={['#4439C1', '#F6749F', '#CD4472', '#722774']}/>
                        </Col>
                        <Col xs={3}>
                            <Category color={'#4474B6'} percent={19.6} title={'Telegram.org'} right/>
                            <Category color={'#44B69A'} percent={9} title={'Виртуализация'} right/>
                            <Category color={'#409E6F'} percent={3.5} title={'radio.yandex.uz'} right/>

                            <Category color={'#15746E'} percent={7} title={'itv.uz'} right className={'mt-50'}/>
                            <Category color={'#47A6FF'} percent={7} title={'archive.uz'} right/>
                            <Category color={'#515061'} percent={4.6} title={'my.gov.uz'} right/>

                            <Category color={'#15746E'} percent={7} title={'itv.uz'} right className={'mt-50'}/>
                            <Category color={'#47A6FF'} percent={7} title={'archive.uz'} right/>
                            <Category color={'#515061'} percent={4.6} title={'my.gov.uz'} right/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <DashboardBox>
                        <Row>
                            <Col xs={8}>
                                <EmployeeProfile/>
                            </Col>
                            <Col xs={4}>
                                <Progressbar/>
                            </Col>
                        </Row>
                    </DashboardBox>
                </Col>
            </Row>
        </Section>
    );
};

export default DashboardContainer;