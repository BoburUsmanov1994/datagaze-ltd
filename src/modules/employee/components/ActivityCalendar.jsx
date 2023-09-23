import React from 'react';
import {Row, Col} from "react-grid-system";
import {Calendar, momentLocalizer} from "react-big-calendar";
import styled from "styled-components";
import Section from "../../../components/section";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import {usePaginateQuery} from "../../../hooks/api";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import {get} from "lodash";
import {PROCESSES} from "../../../constants";
import {OverlayLoader} from "../../../components/loader";
import moment from "moment";

const Styled = styled.ul`
  .event__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;

    .event__box_item {
      display: flex;
      align-items: center;
    }
  }
`;
const localizer = momentLocalizer(moment);
const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = get(PROCESSES, `${get(event, 'event.process')}.color`, '#82D39D');
    let style = {
        backgroundColor: backgroundColor,
        color: 'black',
        borderRadius: '30px'
    };
    return {
        style: style
    };
};

const ActivityCalendar = ({
                              id = null,
                              dateRange = null,
                              ...rest
                          }) => {
    const {data, isLoading} = usePaginateQuery({
        key: KEYS.activity,
        url: URLS.activity,
        params: {
            employeeId: id,
            take: 1000,
            skip: 0,
            // groupByDay: true,
            // groupByProcess: true,
            start: get(dateRange, 'startDate'),
            end: get(dateRange, 'endDate')
        },
        enabled: !!(get(dateRange, 'startDate') && get(dateRange, 'endDate'))
    })
    const eventsList = get(data, 'data.data.result', []).map(event => ({
        event,
        start: new Date(Date.parse(get(event, 'dateTime'))),
        end: new Date(Date.parse(moment(get(event, 'dateTime')).add(get(event, 'time'), 'second'))),
        title: <div className={'event__box'}>
            <div className={'event__box_item'}>
                <img
                    className={'mr-10'} src={`data:image/png;base64, ${get(event, 'icon')}`}
                    alt=""/><span>{get(event, 'activeWindowName')}</span>
            </div>
            <div>{get(event, 'time')}</div>
        </div>
    }))
    if (isLoading) {
        return <OverlayLoader/>;
    }
    return (
        <Styled {...rest}>
            <Section>
                <Row>
                    <Col xs={12}>
                        <Calendar
                            onSelectSlot={(slotInfo) => {
                                console.log(slotInfo)
                            }}
                            selectable
                            // popup={true}
                            localizer={localizer}
                            events={eventsList}
                            startAccessor="start"
                            endAccessor="end"
                            style={{height: 750}}
                            eventPropGetter={eventStyleGetter}
                        />
                    </Col>
                </Row>
            </Section>
        </Styled>
    );
};

export default ActivityCalendar;