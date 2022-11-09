import React from 'react';
import styled from "styled-components";
import FormConsumer from "../../context/form/FormConsumer";
import Input from "./components/input";
import CustomSelect from "./components/select";
import Switcher from "./components/switcher";
import MaskedInput from "./components/masked-input";
import Checkbox from "./components/checkbox";
import CustomOtpInput from "./components/otp-input";
import CustomPasswordStrengthInput from "./components/password-strength";

const StyledField = styled.div`
  //margin-bottom: 25px;
`;
const Field = ({type, ...rest}) => {
    return (
        <StyledField>
            {
                ((type) => {
                    switch (type) {
                        case 'input':
                            return <FormConsumer>{({attrs, getValueFromField}) => <Input {...rest} {...attrs}
                                                                                         getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'select':
                            return <FormConsumer>{({attrs, getValueFromField}) => <CustomSelect {...rest} {...attrs}
                                                                                                getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'switch':
                            return <FormConsumer>{({attrs, getValueFromField}) => <Switcher {...rest} {...attrs}
                                                                                            getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'input-mask':
                            return <FormConsumer>{({attrs, getValueFromField}) => <MaskedInput {...rest} {...attrs}
                                                                                               getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'checkbox':
                            return <FormConsumer>{({attrs, getValueFromField}) => <Checkbox {...rest} {...attrs}
                                                                                            getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'input-otp':
                            return <FormConsumer>{({attrs, getValueFromField}) => <CustomOtpInput {...rest} {...attrs}
                                                                                                  getValueFromField={getValueFromField}/>}</FormConsumer>;
                        case 'password-strength':
                            return <FormConsumer>{({attrs, getValueFromField}) => <CustomPasswordStrengthInput {...rest} {...attrs}
                                                                                                  getValueFromField={getValueFromField}/>}</FormConsumer>;
                        default:
                            return "no"
                    }

                })(type)
            }
        </StyledField>
    )
}

export default Field;
