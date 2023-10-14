import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {get, isEqual} from "lodash";
import {ErrorMessage} from "@hookform/error-message";
import Label from "../../../../components/ui/label";
import classNames from "classnames";
import Icon from "../../../../components/ui/icon";

const Styled = styled.div`
  position: relative;

  .form-input {
    display: block;
    min-width: 275px;
    width: 100%;
    padding: 16px 18px;
    color: #000;
    font-size: 14px;
    border: 1px solid #B5B5B5;
    border-radius: 6px;
    outline: none;

    &.hasPaddingRight {
      padding-right: 30px !important;
    }

    &.error {
      border-color: #ef466f;
    }

    &:focus {
      border-color: #4439C1;
    }

    &::placeholder {
      color: #ABABAB;
    }
  }

  .field-icon {
    position: absolute;
    right: 12px;
    top: 18px;
    cursor: pointer;
  }

  .label__danger {
    color: #f1556c;
  }
`;
const Textarea = ({
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
                      ...rest
                  }) => {

    useEffect(() => {
        setValue(name, defaultValue)
    }, [defaultValue])

    useEffect(() => {
        getValueFromField(getValues(name), name);
    }, [watch(name)]);

    return (
        <Styled {...rest}>
            <div className="form-group">
                {!get(property, 'hideLabel', false) && <Label
                    className={classNames({required: get(property, 'hasRequiredLabel', false)})}>{label ?? name} {
                    get(params, 'required') && <span className={'label__danger'}>*</span>
                }</Label>}
                <textarea
                    rows={6}
                    className={classNames('form-input', {
                        error: get(errors, `${name}`, false),
                    })}
                    name={name}
                    {...register(name, params)}
                    placeholder={get(property, "placeholder")}
                    disabled={get(property, "disabled")}
                    defaultValue={defaultValue}
                />
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({messages = `${label ?? name} is required`}) => {

                        if (errors[name].type == 'required') {
                            messages = `${label} is required`;
                        }
                        if (errors[name].type == 'pattern') {
                            messages = `${label} is not valid`;
                        }
                        if (errors[name].type == 'manual') {
                            messages = `${label} ${errors[name].message}`;
                        }
                        return <small className="form-error-message"> {messages}</small>;
                    }}
                />
            </div>
        </Styled>
    );
};

export default Textarea;