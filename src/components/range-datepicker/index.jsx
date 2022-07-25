import React, {memo, useEffect, useState} from 'react';
import styled from "styled-components";
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {Calendar} from "react-feather";
import dayjs from "dayjs";
import {get} from "lodash"
import OutsideClickHandler from "react-outside-click-handler";


const Styled = styled.div`
  margin-right: 40px;
  position: relative;

  .datepicker {
    &__range {
      position: absolute;
      box-shadow: 0px 2px 10px rgba(40, 40, 40, 0.3);
      top: 45px;
      right: 0;
    }

    &__input {
      padding: 5px 35px 5px 10px;
      border-radius: 8px;
      height: 38px;
      min-width: 225px;
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.48), 0px 0px 4px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      position: relative;

      display: flex;
      align-items: center;

      &_calendar {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
      }

      &_text {
        font-size: 14px;
        color: #929292;
      }
    }
  }
`;

const RangeDatepicker = ({
                             ...rest
                         }) => {

    const [open, setOpen] = useState(false)
    const [range, setRange] = useState({startDate: dayjs().subtract(1, 'month').toDate(), endDate: dayjs().toDate()})
    console.log()

    useEffect(() => {
        if (open) {
            setOpen(false)
        }
    }, [range])

    return (
        <Styled {...rest}>
            <div className="datepicker__input" onClick={() => setOpen(prev => !prev)}>
                <span
                    className={'datepicker__input_text'}>{dayjs(get(range, 'startDate')).format("MMM DD, YYYY")} — {dayjs(get(range, 'endDate')).format("MMM DD, YYYY")}</span>
                <Calendar className={'datepicker__input_calendar'} color={'#ABABAB'} size={20}/>
            </div>
            {open &&
            <OutsideClickHandler onOutsideClick={() => {
                setOpen(false)
            }}><DateRangePicker
                ranges={[{...range, key: 'selection'}]}
                onChange={({selection}) => setRange(selection)}
                className={'datepicker__range'}
                rangeColors={['#4439C1']}
                months={2}
                direction="horizontal"
            /></OutsideClickHandler>}
        </Styled>
    );
};

export default memo(RangeDatepicker);