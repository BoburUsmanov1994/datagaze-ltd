import React, {useEffect, useMemo} from 'react';
import {get} from "lodash";
import {useStore} from "../../../store";
import Section from "../../../components/section";


const DashboardContainer = ({...rest}) => {

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
            Dashboard section
        </Section>
    );
};

export default DashboardContainer;