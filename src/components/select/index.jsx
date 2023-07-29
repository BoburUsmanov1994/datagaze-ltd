import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import RSelect, {components} from "react-select";
import caretDown from "../../assets/images/arrow-down-s-line.png";
import {get, isFunction} from "lodash";
import classNames from "classnames";
import Label from "../ui/label";

const StyledFormSelect = styled.div`
  width: 100%;

  .error__control {
    border-color: #ef466f;
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

const colourStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: '#ffffff',
        }
    }
}
const customStyles = {

    control: (base, state, error) => ({
        ...base,
        background: "#fff",
        borderColor: "transparent",
        borderRadius: '5px',
        outline: "none",
        boxShadow: "none",
        color: "#000 !important",
        display: "flex",
        overflow: 'hidden',
        padding: '4px 12px',
        width: '100%',
        minHeight: '35px',
        minWidth: '150px',
        fontSize: '16px',
        fontWeight: '400',
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

const Select = ({
                    options = [],
                    label,
                    defaultValue = '',
                    disabled = false,
                    params = {},
                    property = {},
                    onChange = (value) => {
                        console.log(value)
                    },
                    isMulti = false,
                    isDisabled = false,
                    ...props
                }) => {

    const [selectedValue, setSelectedValue] = useState(null)

    useEffect(() => {
        setSelectedValue(defaultValue)
    }, [defaultValue])

    const handleChange = (value) => {
        setSelectedValue(value.value);
        if (isFunction(get(property, 'onChange'))) {
            get(property, 'onChange')(value);
        }
    }
    return (
        <>
            <div className="form-group">
                {!get(property, 'hideLabel', false) && <Label
                    className={classNames({required: get(property, 'hasRequiredLabel', false)})}>{label}</Label>}
                <StyledFormSelect {...props}>
                    <RSelect
                        clearIndicator={true}
                        options={options}
                        disabled={disabled}
                        placeholder={get(property, 'placeholder', 'Select...')}
                        onChange={handleChange}
                        styles={customStyles}
                        components={{DropdownIndicator}}
                        isMulti={isMulti}
                        isDisabled={isDisabled}
                        className={'form-select form-select-text'}
                        classNamePrefix={classNames('form-select')}
                        value={
                            isMulti ? selectedValue : options.filter(option =>
                                option.value === selectedValue)
                        }
                    />
                </StyledFormSelect>
            </div>

        </>
    );
};

export default Select;