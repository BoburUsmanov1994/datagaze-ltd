import React, {useEffect, useMemo} from 'react';
import {get} from "lodash";
import {useStore} from "../../../store";
import Section from "../../../components/section";
import {useTranslation} from "react-i18next";


const DashboardContainer = ({...rest}) => {
    const {t} = useTranslation()
    const setBreadcrumbs = useStore(state => get(state, 'setBreadcrumbs', () => {
    }))
    const breadcrumbs = useMemo(() => [
        {
            id: 1,
            title: t('Статистика'),
            path: '/dashboard',
        }
    ], [])

    useEffect(() => {
        setBreadcrumbs(breadcrumbs)
    }, [])

    return (
        <Section>
            {t('Dashboard section')}
        </Section>
    );
};

export default DashboardContainer;