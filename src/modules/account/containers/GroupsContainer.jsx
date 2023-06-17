import React, {useEffect, useMemo} from 'react';
import Section from "../../../components/section";
import {Row, Col} from "react-grid-system";
import Title from "../../../components/ui/title";
import Button from "../../../components/ui/button";
import {PlusCircle} from "react-feather";
import Flex from "../../../components/flex";
import AccountCard from "../components/account-card";
import {useStore} from "../../../store";
import {get} from "lodash";
import {useGetAllQuery} from "../../../hooks/api";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {OverlayLoader} from "../../../components/loader";
import EmptyPage from "../../auth/pages/EmptyPage";
import GroupCard from "../components/group-card";

const GroupsContainer = ({
                             ...rest
                         }) => {
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    let {data, isLoading} = useGetAllQuery({
        key: KEYS.groups, url: URLS.groups,
        params: {
            take: 100,
            skip: 0
        }
    })
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Datagaze DLP',
            path: '/',
        },
        {
            id: 2,
            title: 'Группы пользователей',
            path: '#',
        }
    ], [])

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    if (isLoading) {
        return <OverlayLoader/>
    }

    return (
        <>
            <Section>
                <Row className={'mb-15'}>
                    <Col xs={8}>
                        <Title>Группы пользователей</Title>
                    </Col>
                    <Col xs={4} className={'text-right'}>
                        <Button primary rounded><Flex><PlusCircle size={18} className={'mr-5'}/><span>Добавить новую группу</span></Flex></Button>
                    </Col>
                </Row>
                <Row>
                    {
                        get(data, 'data.data.groups', [])?.length > 0 ? get(data, 'data.data.groups', []).map(item =>
                            <Col key={get(item, 'id')}
                                 xs={3}>
                                <GroupCard data={item}/>
                            </Col>) : <EmptyPage/>
                    }
                </Row>
            </Section>
        </>
    );
};

export default GroupsContainer;