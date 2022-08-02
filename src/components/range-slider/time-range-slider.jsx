import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {head, last, range} from "lodash";
import {ChevronLeft, ChevronRight} from "react-feather";

const {SliderTooltip, Handle} = Slider


const Styled = styled.div`
  position: relative;
  height: 80px;
  padding: 15px 80px;

  .rc-slider-mark {
    top: 18px;
    font-size: 14px;
    font-weight: 300;
    color: #000;
  }

  .rc-slider-handle-dragging {
    box-shadow: none !important;
    outline: none !important;
  }

  .rc-slider-handle {
    z-index: 99;
  }

  .rc-slider-step {
    display: none;
  }

  .rc-slider-mark-text {
    border-right: 1px solid #BABABA;
    width: ${({width}) => width};

    &:last-child {
      border-right-color: transparent !important;
    }

    &.rc-slider-mark-text-active {
      font-weight: 500;
      border-right-color: #000;
      color: #000;
    }
  }

  .rc-slider-mark {
  }

  .slider__prev {
    left: 15px;
  }

  .slider__next {
    right: 15px;
  }

  .slider__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 1px solid #C8C8C8;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: transparent;
  }
`;

const handle = props => {

    const {value, dragging, index, ...restProps} = props;

    return (
        <SliderTooltip
            prefixCls="rc-slider-tooltip"
            overlay={`${value < 10 ? '0' + value : value}:00`}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </SliderTooltip>
    );
};


const TimeRangeSlider = ({
                             defaultValue = [2, 10],
                             min = 0,
                             max = 23,
                             step = 1,
                             ...rest
                         }) => {
        const [value, setValue] = useState([min, min])

        const next = () => {
            if (last(value) < max) {
                setValue(prev => ([head(prev), last(prev) + 1]))
            }
        }

        const prev = () => {
            if (head(value) > min) {
                setValue(prev => ([head(prev) - 1, last(prev)]))
            }
        }

        useEffect(() => {
            if (defaultValue) {
                setValue(defaultValue)
            }
        }, [])
        return (
            <Styled width={100 / 23 + '%'} {...rest}>
                <button onClick={prev} className={"slider__btn slider__prev"}><ChevronLeft size={16} color={'#707070'}/>
                </button>
                <Slider
                    range
                    defaultValue={value}
                    min={min}
                    max={max}
                    value={value}
                    onChange={(val) => setValue(val)}
                    marks={range(min, max + 1).map(r => r < 10 ? `0${r}:00` : `${r}:00`)}
                    railStyle={{background: 'transparent', height: 40}}
                    trackStyle={{background: '#FEC83C', height: 40, borderRadius: 'unset'}}
                    handleStyle={{
                        width: 20,
                        height: 40,
                        top: 9,
                        background: 'transparent',
                        borderRadius: 'unset',
                        borderColor: 'transparent'
                    }}
                    dots={false}
                    allowCross={false}
                    step={0.2}
                    handle={handle}
                    tipFormatter={value => `${value}`}
                />
                <button className={"slider__btn slider__next"} onClick={next}><ChevronRight size={16} color={'#707070'}/>
                </button>
            </Styled>
        );
    }
;

export default TimeRangeSlider;