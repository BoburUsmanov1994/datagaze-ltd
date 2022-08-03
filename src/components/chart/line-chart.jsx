import React,{memo} from 'react';
import styled from "styled-components";
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer} from "recharts"

const Styled = styled.div`

`;

const CustomLineChart = ({
                             data = [],
                             ...rest
                         }) => {
    return (
        <Styled {...rest}>
            <ResponsiveContainer width={'100%'} height={250}>
            <LineChart  width={500}
                        height={300}  data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey={"count"} />
                <Tooltip />
                <Line strokeWidth={3} type="monotone" dataKey="count" stroke="#463BC1" />
            </LineChart>
            </ResponsiveContainer>
        </Styled>
    );
};

export default memo(CustomLineChart);