import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Label from "../../../../components/ui/label";
import classNames from "classnames";
import {get, isEmpty} from "lodash";
import {ErrorMessage} from "@hookform/error-message";
import {CheckboxGroup, Checkbox} from "@chakra-ui/checkbox";


const Styled = styled.div`
  .chakra-checkbox__control {
    background-color: #13D6D1;
    width: 20px;
    height: 20px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    font-size: 12px;
    color: #fff;
    margin-right: 5px;
  }

  .chakra-checkbox {
    margin-right: 25px;
  }

  .checkbox-label {
    margin-bottom: 15px;
  }
`;

const CheckboxComponent = ({
                               Controller,
                               control,
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
                               options = [],
                               ...rest
                           }) => {
    const [values, setValues] = useState([])
    useEffect(() => {
        setValues(defaultValue);
    }, [defaultValue])

    useEffect(()=>{
        setValue(name,values)
    },[values])
    return (
        <Styled {...rest}>
            <div className="form-group">
                <Label
                    className={classNames('checkbox-label', {required: get(property, 'hasRequiredLabel', false)})}>{label ?? name}</Label>
                <CheckboxGroup onChange={(val) => setValues(val)}
                               defaultValue={values}>
                    {
                        options && options.map((option, i) =>
                            <Checkbox key={i + 1} value={get(option, 'value')}>{get(option, 'label')}</Checkbox>
                        )
                    }

                </CheckboxGroup>
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({messages = `${label} is required`}) => {

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

export default CheckboxComponent;