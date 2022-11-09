import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Label from "../../../../components/ui/label";
import Switch from "react-switch";
import Flex from "../../../../components/flex";
import classNames from "classnames";
import {get, head, last} from "lodash";
import OtpInput from 'react-otp-input';

const Styled = styled.div`

`;
const CustomOtpInput = ({
                            register,
                            disabled = false,
                            name,
                            errors,
                            params,
                            property,
                            defaultValue,
                            getValues,
                            watch,
                            label,
                            setValue,
                            getValueFromField = () => {
                            },
                            options = [
                                {
                                    value: false,
                                    label: 'Нет'
                                },
                                {
                                    value: true,
                                    label: 'Да'
                                },
                            ],
                            ...rest
                        }) => {
    const [otp, setOtp] = useState('')


    useEffect(() => {
        if (otp) {
            setValue(name, otp)
        }

    }, [otp])
    return (
        <Styled {...rest}>
            <div className="form-group">
                <Label
                    className={classNames({required: get(property, 'hasRequiredLabel', false)})}>{label ?? name}</Label>
                <OtpInput
                    containerStyle={{display:'flex',justifyContent:'space-around',marginTop:'18px',marginBottom:'24px'}}
                    inputStyle={{fontWight:500,color:'#223263',width:50,height:60,fontSize:'40px',borderRadius:'5px 5px 0 0',border:'1px solid #223263',borderBottom:'4px solid #223263'}}
                    focusStyle={{outline:'none'}}
                    value={otp}
                    onChange={(val) => setOtp(val)}
                    numInputs={5}
                    isInputNum
                    separator={<span> </span>}
                />
            </div>
        </Styled>
    );
};

export default CustomOtpInput;