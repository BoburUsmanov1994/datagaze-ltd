import React, {memo} from 'react';
import styled from "styled-components";
import {PieChart, Pie, Tooltip, ResponsiveContainer, Cell} from "recharts";

const Styled = styled.div``;
const CustomPieChart = ({
                            data = [],
                            colors = [],
                            ...rest
                        }) => {

    return (
        <Styled {...rest}>
            <ResponsiveContainer width={'100%'} height={450}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data}
                        stroke={''}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                        ))}
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </Styled>
    );
};

export default memo(CustomPieChart);