import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {range} from "lodash";

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

`;
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
                    step={step}
                    value={value}
                    onChange={(val) => setValue(val)}
                    marks={range(min - 1, max + 1)}
                    railStyle={{background: 'transparent', height: 48}}
                    trackStyle={{background: '#FFF5DA', height: 14}}
                    handleStyle={{
                        width: 9,
                        height: 9,
                        top: 10,
                        background: 'rgb(254 200 60 / 60%)',
                        borderColor: 'rgb(254 200 60 / 60%)'
                    }}
                    dots={true}
                    dotStyle={{background: "red", width: 1, height: 14, top: 0,borderRadius:'unset',border:'unset'}}
                    activeDotStyle={{background: '#FFF5DA', opacity: 1, borderColor: 'transparent'}}
                    allowCross={false}
                    tabIndex={min}
                />
            </Styled>
        );
    }
;

export default TimeRangeSlider;