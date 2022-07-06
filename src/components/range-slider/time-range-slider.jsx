import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Slider  from "rc-slider";
import 'rc-slider/assets/index.css';
import {range} from "lodash";
const {Tooltip,Handle} = Slider
const createSliderWithTooltip = Slider.createSliderWithTooltip;

const Styled = styled.div`
  .rc-slider-mark {
    top: -18px;
    font-size: 14px;
    color: #000;
    font-weight: 300;
  }

  .rc-slider-handle-dragging {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.13) !important;
  }

  .rc-slider-handle {
    z-index: 99;
  }
  .rc-slider-dot:nth-child(5n+1){
    height: 9px !important;
  }
`;

const handle = props => {

    const { value, dragging, index, ...restProps } = props;

    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={1}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={1} {...restProps} />
        </Tooltip>
    );
};


const TimeRangeSlider = ({
                              defaultValue = [2, 10],
                              min = 1,
                              max = 31,
                              step = 1,
                              ...rest
                          }) => {
        const [value, setValue] = useState([min, min])

        useEffect(() => {
            if (defaultValue) {
                setValue(defaultValue)
            }
        }, [])
        return (
            <Styled {...rest}>
                <Slider
                    range
                    defaultValue={[2, 5]}
                    min={min}
                    max={max}
                    value={value}
                    onChange={(val) => setValue(val)}
                    marks={range(min - 1, max + 1)}
                    railStyle={{background: '#707070', height: 1}}
                    trackStyle={{background: '#FFF5DA', height: 14,borderTop:'1px solid #FEC83C'}}
                    handleStyle={{
                        width: 9,
                        height: 9,
                        top: 6,
                        background: 'rgb(254 200 60 / 60%)',
                        borderColor: 'rgb(254 200 60 / 60%)'
                    }}
                    dots={true}
                    dotStyle={{background: "#9B9B9B", width: 1, height: 6, top: 0,borderRadius:'unset',border:'unset'}}
                    activeDotStyle={{background: '#FEC83C', opacity: 1, borderColor: 'transparent'}}
                    allowCross={false}
                    tabIndex={min}
                    step={0.2}
                    handle={handle}
                    tipFormatter={value => `${value}`}
                />
            </Styled>
        );
    }
;

export default TimeRangeSlider;