import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Select, {components} from "react-select";
import caretDown from "../../../../assets/images/caret-down.png";
import {ErrorMessage} from "@hookform/error-message";
import Label from "../../../../components/ui/label";
import {get} from "lodash";
import classNames from "classnames";
import {useTranslation} from "react-i18next";

const StyledFormSelect = styled.div`
  width: 100%;

  .error__control {
    border-color: #ef466f;
  }

  .label__danger {
    color: #f1556c;
  }
`;

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <img src={caretDown} alt=""/>
            </components.DropdownIndicator>
        )
    );
};
const customStyles = {

    control: (base, state, error) => ({
        ...base,
        background: "#fff",
        borderColor: error ? "#ef466f" : "#BABABA",
        borderRadius: '5px',
        outline: "none",
        boxShadow: "none",
        color: "#7E7E7E",
        display: "flex",
        overflow: 'hidden',
        padding: '4px 12px',
        width: '100%',
        minHeight: '40px',
        fontSize: '16px',
        fontWeight: '300',
        "&:hover": {
            borderColor: '#4439C1',
            outline: "none",
        },
        "&:focus": {
            borderColor: '#4439C1',
            outline: "none",
        }
    }),
    indicatorSeparator: (base, state) => ({
        ...base,
        display: 'none'
    })
};

const FormSelect = ({
                        options = [],
                        setValue,
                        label,
                        name,
                        validation,
                        error,
                        defaultValue = '',
                        disabled = false,
                        Controller,
                        control,
                        params = {},
                        property = {},
                        onChange = (value) => {
                            console.log(value)
                        },
                        isMulti = false,
                        isDisabled = false,
                        errors,
                        watch,
                        getValueFromField = () => {
                        },
                        getValues = () => {
                        },
                        ...props
                    }) => {
    const {t} = useTranslation()
    const [selectedValue, setSelectedValue] = useState(null)

    useEffect(() => {
        setValue(name, defaultValue)
        setSelectedValue(defaultValue)
    }, [defaultValue])

    const handleChange = (value) => {
        setSelectedValue(value.value);
        setValue(name, isMulti ? [...value.map(item => item.value)] : value.value);
        onChange(value);
    }

    useEffect(() => {
        getValueFromField(getValues(name), name);
    }, [watch(name)]);

    return (
        <>
            <div className="form-group">
                {!get(property, 'hideLabel', false) && <Label
                    className={classNames({required: get(property, 'hasRequiredLabel', false)})}>{label ?? name} {
                    get(params, 'required') && <span className={'label__danger'}>*</span>
                }</Label>}

                <StyledFormSelect {...props}>
                    <Controller
                        control={control}
                        name={name}
                        rules={params}
                        render={() => (
                            <Select
                                clearIndicator={true}
                                options={options}
                                disabled={disabled}
                                placeholder={get(property, 'placeholder', t('Select...'))}
                                onChange={handleChange}
                                styles={customStyles}
                                components={{DropdownIndicator}}
                                isMulti={isMulti}
                                isDisabled={isDisabled}
                                className={'form-select'}
                                classNamePrefix={classNames('form-select', {error: get(errors, `${name}`, false)})}
                                value={
                                    isMulti ? selectedValue : options.filter(option =>
                                        option.value === selectedValue)
                                }
                            />
                        )}
                    />

                </StyledFormSelect>
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({messages = `${label} is required`}) => {

                        if (errors[name].type == 'required') {
                            messages = `${label} ${t('is required')}`;
                        }
                        if (errors[name].type == 'pattern') {
                            messages = `${label} ${t('is not valid')}`;
                        }
                        if (errors[name].type == 'manual') {
                            messages = `${label} ${errors[name].message}`;
                        }
                        return <small className="form-error-message"> {messages}</small>;
                    }}
                />
            </div>

        </>
    );
};

export default FormSelect;