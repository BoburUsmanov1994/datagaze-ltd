import React, {useEffect, useMemo} from 'react';
import {get, chunk, ceil, head, last, entries} from "lodash";
import {useStore} from "../../../store";
import Section from "../../../components/section";
import {Col, Row} from "react-grid-system";
import Card from "../../../components/card";
import {AlertCircle, AlertOctagon, BarChart2, Bell, Clock, Info, Monitor, PieChart, Shield, Users} from "react-feather";
import Category from "../../../components/category";
import {BarChart, CustomPieChart, LineChart} from "../../../components/chart";
import {useGetAllQuery} from "../../../hooks/api";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {OverlayLoader} from "../../../components/loader";
import {colors} from "../../../constants/colors";
import classNames from "classnames";
import DashboardBox from "../components/dashboard-box";
import Table from "../../../components/table";


const DashboardContainer = ({...rest}) => {
    const dateRange = useStore(state => get(state, "dateRange"));
    let {data: incidents, isLoading: incidentsIsLoading,isError} = useGetAllQuery({key: KEYS.incidents, url: URLS.incidents})
    let {data: statusComps, isLoading: statusCompsIsloading} = useGetAllQuery({
        key: KEYS.statusComps,
        url: URLS.statusComps
    })
    let {
        data: organizationReports,
        isLoading: organizationReportsIsloading
    } = useGetAllQuery({
        key: KEYS.organizationReports,
        url: URLS.organizationReports,
        params: {from: get(dateRange, "startDate"), to: get(dateRange, "endDate")}
    })
    let {data: incsByPeriod} = useGetAllQuery({key: KEYS.incsByPeriod, url: URLS.incsByPeriod})
    let {data: incsByType} = useGetAllQuery({key: KEYS.incsByType, url: URLS.incsByType})
    // let {data: topUsers} = useGetAllQuery({key: KEYS.topUsers, url: URLS.topUsers})
    // let {data: kpd} = useGetAllQuery({key: KEYS.kpd, url: URLS.kpd})


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

    if(isError){
        return "Error"
    }
    if (incidentsIsLoading || statusCompsIsloading || organizationReportsIsloading) {
        return <OverlayLoader/>
    }


    return (
        <Section>
            <Row className={"mb-15"}>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Обнаруженные инциденты'} count={get(incidents, "data.allIncidents", 0)} percent={12.5}
                          icon={<Bell color={'#8A8A8A'} size={28}/>}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Всего сотрудников'} count={get(statusComps, "data.allComps", 0)} percent={12.5}
                          icon={<Users color={'#8A8A8A'} size={28}/>}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Активные компьютеры'} count={get(statusComps, "data.onlineComps", 0)} percent={12.5}
                          icon={<Monitor color={'#8A8A8A'} size={28}/>}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Инциденты высокого уровня'} count={get(incidents, "data.high", 0)} percent={12.5}
                          icon={<Shield color={'#8A8A8A'} size={28}/>}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Инциденты среднего уровня'} count={get(incidents, "data.medium", 0)} percent={12.5}
                          icon={<AlertOctagon color={'#8A8A8A'} size={28}/>}/>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} xxl={2}>
                    <Card title={'Инциденты низкого уровня'} count={get(incidents, "data.low", 0)} percent={12.5}
                          icon={<Info color={'#8A8A8A'} size={28}/>}/>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <DashboardBox title={"Инциденты по каналу"} icon={<PieChart color={'#4439C1'} size={32}/>}>
                        <Col xs={12} xxl={12}>
                            <Row align={'center'}>
                                <Col xs={3}>
                                    {
                                        head(chunk(get(organizationReports, "data.channel", []), ceil(get(organizationReports, "data.channel", [])?.length / 2))).map((organization, i) =>
                                            <Category key={i}
                                                      color={colors[i]} percent={get(organization, 'percentage', 0)}
                                                      title={get(organization, "name", '-')}/>)
                                    }
                                </Col>
                                <Col xs={6}>
                                    <CustomPieChart
                                        data={get(organizationReports, "data.channel", []).map(({name, value}) => ({
                                            name,
                                            value
                                        }))}
                                        colors={colors}
                                    />
                                </Col>
                                <Col xs={3}>
                                    {
                                        last(chunk(get(organizationReports, "data.channel", []), ceil(get(organizationReports, "data.channel", [])?.length / 2))).map((organization, i) =>
                                            <Category key={i}
                                                      color={colors[ceil(get(organizationReports, "data.channel", [])?.length / 2) + i]}
                                                      percent={get(organization, 'percentage', 0)}
                                                      title={get(organization, "name")} right/>)
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </DashboardBox>
                </Col>
                <Col lg={6}>
                    <DashboardBox title={"Инциденты по уровня"} icon={<PieChart color={'#4439C1'} size={32}/>}>
                        <Col xs={12} xxl={12}>
                            <Row align={'center'}>
                                <Col xs={3}>
                                    {
                                        head(chunk(get(organizationReports, "data.severity", []), ceil(get(organizationReports, "data.severity", [])?.length / 2))).map((organization, i) =>
                                            <Category key={i}
                                                      color={colors[i]} percent={get(organization, 'percentage', 0)}
                                                      title={get(organization, "name", '-')}/>)
                                    }
                                </Col>
                                <Col xs={6}>
                                    <CustomPieChart
                                        data={get(organizationReports, "data.severity", []).map(({name, value}) => ({
                                            name,
                                            value
                                        }))}
                                        colors={colors}
                                    />
                                </Col>
                                <Col xs={3}>
                                    {
                                        last(chunk(get(organizationReports, "data.severity", []), ceil(get(organizationReports, "data.severity", [])?.length / 2))).map((organization, i) =>
                                            <Category key={i}
                                                      color={colors[ceil(get(organizationReports, "data.severity", [])?.length / 2) + i]}
                                                      percent={get(organization, 'percentage', 0)}
                                                      title={get(organization, "name")} right/>)
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </DashboardBox>
                </Col>
                <Col lg={6}>
                    <DashboardBox title={"Статистика по утечке и предотв"} icon={<PieChart color={'#4439C1'} size={32}/>}>
                        <Col xs={12} xxl={12}>
                            <Row align={'center'}>
                                <Col xs={3}>
                                    {
                                        head(chunk(get(organizationReports, "data.action", []), ceil(get(organizationReports, "data.action", [])?.length / 2))).map((organization, i) =>
                                            <Category key={i}
                                                      color={colors[i]} percent={get(organization, 'percentage', 0)}
                                                      title={get(organization, "name", '-')}/>)
                                    }
                                </Col>
                                <Col xs={6}>
                                    <CustomPieChart data={get(organizationReports, "data.action", []).map(({name, value}) => ({
                                        name,
                                        value
                                    }))}
                                                    colors={colors}
                                    />
                                </Col>
                                <Col xs={3}>
                                    {
                                        last(chunk(get(organizationReports, "data.action", []), ceil(get(organizationReports, "data.action", [])?.length / 2))).map((organization, i) =>
                                            <Category key={i}
                                                      color={colors[ceil(get(organizationReports, "data.action", [])?.length / 2) + i]}
                                                      percent={get(organization, 'percentage', 0)}
                                                      title={get(organization, "name")} right/>)
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </DashboardBox>
                </Col>
                <Col lg={6}>
                    <DashboardBox title={"Инциденты по действительности"} icon={<PieChart color={'#4439C1'} size={32}/>}>
                        <Col xs={12} xxl={12}>
                            <Row align={'center'}>
                                <Col xs={3}>
                                    {
                                        head(chunk(get(organizationReports, "data.rate", []), ceil(get(organizationReports, "data.rate", [])?.length / 2))).map((organization, i) =>
                                            <Category className={classNames({'mt-50': i % 3 == 0 && i >= 3})} key={i}
                                                      color={colors[i]} percent={get(organization, 'percentage', 0)}
                                                      title={get(organization, "name", '-')}/>)
                                    }
                                </Col>
                                <Col xs={6}>
                                    <CustomPieChart data={get(organizationReports, "data.rate", []).map(({name, value}) => ({
                                        name,
                                        value
                                    }))}
                                                    colors={colors}
                                    />
                                </Col>
                                <Col xs={3}>
                                    {
                                        last(chunk(get(organizationReports, "data.rate", []), ceil(get(organizationReports, "data.rate", [])?.length / 2))).map((organization, i) =>
                                            <Category key={i}
                                                      color={colors[ceil(get(organizationReports, "data.rate", [])?.length / 2) + i]}
                                                      percent={get(organization, 'percentage', 0)}
                                                      title={get(organization, "name")} right/>)
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </DashboardBox>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    {/*<DashboardBox>*/}
                    {/*    <Row>*/}
                    {/*        <Col xs={8}>*/}
                    {/*            <EmployeeProfile/>*/}
                    {/*        </Col>*/}
                    {/*        <Col xs={4}>*/}
                    {/*            <Progressbar/>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</DashboardBox>*/}
                </Col>
                <Col md={6}>
                    {/*<DashboardBox title={"Сотрудники с наибольшим количеством инцидентов"}*/}
                    {/*              icon={<AlertCircle color={'#E25353'} size={28}/>}>*/}
                    {/*    <Table />*/}
                    {/*</DashboardBox>*/}
                </Col>
                <Col md={6} >
                    <DashboardBox title={"Инциденты по времени"}
                                  icon={<Clock color={'#463BC1'} size={28}/>}>
                        <LineChart data={entries(get(incsByPeriod,"data",{})).map(period => ({name:head(period),count:last(period)}))} />
                    </DashboardBox>
                </Col>
                <Col md={6}>
                    <DashboardBox title={"Распределение инцидентов по типам"}
                                  icon={<BarChart2 color={'#463BC1'} size={28}/>}>
                            <BarChart data={entries(get(incsByType,'data',{})).map(type => ({name:head(type),value:last(type)}))} />
                    </DashboardBox>
                </Col>
            </Row>
        </Section>
    );
};

export default DashboardContainer;