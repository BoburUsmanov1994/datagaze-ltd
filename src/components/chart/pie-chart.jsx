import React from 'react';
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
            <ResponsiveContainer width={'100%'} height={500}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data}
                        outerRadius={200}
                        stroke={''}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                        ))}
                    </Pie>

                    {/* Display the tooltips */}
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </Styled>
    );
};

export default CustomPieChart;