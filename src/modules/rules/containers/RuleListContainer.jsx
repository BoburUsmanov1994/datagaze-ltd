import React, {useEffect, useMemo} from 'react';
import Section from "../../../components/section";
import {Row, Col} from "react-grid-system"
import Title from "../../../components/ui/title";
import {useStore} from "../../../store";
import {get} from "lodash";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {useDeleteQuery, useGetAllQuery} from "../../../hooks/api";
import {OverlayLoader} from "../../../components/loader";
import Button from "../../../components/ui/button";
import Flex from "../../../components/flex";
import {PlusCircle} from "react-feather";
import EmptyPage from "../../auth/pages/EmptyPage";
import RuleCard from "../../../components/rule-card";
import {useTranslation} from "react-i18next";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const RuleListContainer = () => {
    const navigate = useNavigate();
    const {t} = useTranslation()
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: 'Sector DLP',
            path: '/',
        },
        {
            id: 2,
            title: t('Rules'),
            path: '#',
        }
    ], [])
    let {data, isLoading} = useGetAllQuery({
        key: KEYS.rules, url: URLS.rules,
        params: {
            take: 100,
            skip: 0
        }
    })

    const {mutate: deleteRequest} = useDeleteQuery({listKeyId: KEYS.rules})


    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])


    if (isLoading) {
        return <OverlayLoader/>
    }


    const remove = (_id) => {
        Swal.fire({
            title: t('Are you sure?'),
            icon: 'error',
            backdrop: 'rgba(0,0,0,0.9)',
            background: 'none',
            confirmButtonColor: '#CD4472',
            confirmButtonText: t('Delete'),
            showCancelButton: true,
            cancelButtonColor: '',
            cancelButtonText: t('Cancel'),
            customClass: {
                title: 'title-color',
                content: 'text-color',
                icon: 'icon-color',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRequest({
                    url: `${URLS.rules}/${_id}`,
                })
            }
        });

    }


    return (
        <Section>
            <Row className={'mb-15'} items={'center'}>
                <Col xs={8}>
                    <Title>{t("Правило политики")}</Title>
                </Col>
                <Col xs={4} className={'text-right'}>
                    <Button onClick={() => navigate('/rules/create')} primary rounded><Flex><PlusCircle size={18}
                                                                                                        className={'mr-5'}/><span>{t("Добавить правило")}</span></Flex></Button>
                </Col>
            </Row>
            <Row>
                {
                    get(data, 'data.data.rules', [])?.length > 0 ? get(data, 'data.data.rules', []).map(item =>
                        <Col key={get(item, 'id')}
                             xs={6}>
                            <RuleCard handleRemove={remove} data={item}/>
                        </Col>) : <EmptyPage/>
                }
            </Row>

        </Section>
    );
};

export default RuleListContainer;