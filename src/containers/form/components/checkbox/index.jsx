import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Label from "../../../../components/ui/label";
import classNames from "classnames";
import {get, isEmpty} from "lodash";
import {ErrorMessage} from "@hookform/error-message";



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

            </div>
        </Styled>
    );
};

export default CheckboxComponent;