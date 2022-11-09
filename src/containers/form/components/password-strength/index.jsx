import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Label from "../../../../components/ui/label";
import classNames from "classnames";
import {get, head, last} from "lodash";
import PasswordStrengthBar from 'react-password-strength-bar';

const Styled = styled.div`

`;
const CustomPasswordStrengthInput = ({
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
    const [password, setPassword] = useState('')


    useEffect(() => {
        if (password) {
            setValue(name, password)
        }

    }, [password])
    return (
        <Styled {...rest}>
            <div className="form-group">


            </div>
        </Styled>
    );
};

export default CustomPasswordStrengthInput;