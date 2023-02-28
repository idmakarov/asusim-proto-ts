import React from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface SimChartProps {
    variables?: { name: string, color: string }[];
    chartData?: [];
}

type Props = Readonly<SimChartProps>;

class SimChart extends React.Component<Props> {
    render() {
        const lines = this.props.variables?.map((item) => {
            return <Line type='linear' dataKey={item.name} name={item.name} stroke={item.color} activeDot={{ r: 6 }} isAnimationActive={false}/>
        });

        return(
            <ResponsiveContainer className={'container-responsive'}>
                <LineChart data={this.props.chartData}>
                    {lines}
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip />
                    <XAxis dataKey="t" />
                    <YAxis />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default SimChart;