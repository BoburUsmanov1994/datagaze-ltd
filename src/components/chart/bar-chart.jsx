import React, {memo} from 'react';
import styled from "styled-components";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Cell,
    Tooltip,
    Legend,
    CartesianGrid,
    LabelList
} from 'recharts';
import {isEmpty} from "lodash";
import {colors} from "../../constants/colors";

const Styled = styled.div`
  height: 250px;
`;

const CustomizedLabel = ({x, y, fill, value}) => {

    return <text
        x={x}
        y={y}
        fontSize='14'
        fontFamily='sans-serif'
        fill={fill}
        textAnchor="start">{value}%</text>
};

const CustomBarChart = ({
                            data = [],
                            ...rest
                        }) => {

    return (
        <Styled {...rest}>
            {!isEmpty(data) && <ResponsiveContainer width={'100%'} height={'100%'}>
                <BarChart
                    data={data}
                    layout="vertical"
                >
                    <XAxis type="number" hide/>
                    <YAxis   type="category" width={100} dataKey="name"/>
                    <CartesianGrid stroke="#F4F4F4"/>
                    <Bar
                        dataKey="value"
                        barSize={15}
                        fill={"#000"}
                        radius={[10, 10, 10, 10]}
                    >
                        {data && data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                        <LabelList dataKey="value" position="right"/>
                    </Bar>
                </BarChart>
            </ResponsiveContainer>}
        </Styled>
    );
};

export default memo(CustomBarChart);