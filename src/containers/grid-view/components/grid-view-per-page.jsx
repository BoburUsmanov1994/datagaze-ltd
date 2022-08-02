import React, {memo, useState, useEffect} from 'react';
import styled from "styled-components";
import Select from 'react-select'

const Styled = styled.div`
  width: 100px;
  margin-left: 25px;
`;

const GridViewPerPage = ({
                             setLimit = () => {
                             },
                             defaultValue = {value: 5, label: 5},
                             options = [
                                 {
                                     value: 5, label: 5
                                 },
                                 {
                                     value: 10, label: 10
                                 },
                                 {
                                     value: 25, label: 25
                                 },
                                 {
                                     value: 50, label: 50
                                 },
                                 {
                                     value: 100, label: 100
                                 }
                             ], ...rest
                         }) => {
    const [value, setValue] = useState(null);
    useEffect(() => {
        if (value) {
            setLimit(value);
        }
    }, [value])
    return (<Styled {...rest}>
        <Select onChange={({value}) => setValue(value)} options={options} defaultValue={defaultValue}/>
    </Styled>);
};

export default memo(GridViewPerPage);