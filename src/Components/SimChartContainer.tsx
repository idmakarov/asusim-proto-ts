import React, { ReactNode } from "react";
import SimChart from "./SimChart";
import "src/styles/containers.css"

interface SimChartContainerDefaultProps {
    title?: string;
    noDataComponent?: ReactNode;
}

interface SimChartContainerProps extends SimChartContainerDefaultProps {
    variables?: [];
    chartData?: [];
}

type DefaultProps = Readonly<SimChartContainerDefaultProps>;
type Props = Readonly<SimChartContainerProps>;

class SimChartContainer extends React.Component<Props> {
    public static readonly defaultProps: DefaultProps = {
        title: "График",
        noDataComponent: <span className='container-text-S'>Нет данных для отображения</span>,
    };

    render() {
        return (
            <div className='container-base'>
                <div className='stackpanel-vertical-padding10-gap10'>
                    <span className='container-text-M'></span>
                    {
                        this.props.variables !== undefined && this.props.variables.length > 0 ?
                        <SimChart
                            variables={this.props.variables}
                            chartData={this.props.chartData}
                        /> :
                        this.props.noDataComponent
                    }
                </div>
            </div>
        );
    }
}

export default SimChartContainer;