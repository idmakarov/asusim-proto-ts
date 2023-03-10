import { Component } from "react";
import "../styles/figures.css";
import { SimStatusEnum } from "../utils/simEnums";

interface StatusIndicatorDefaultProps {
    status?: SimStatusEnum;
    className?: string;
}

interface StatusIndicatorProps extends StatusIndicatorDefaultProps {}

type DefaultProps = Readonly<StatusIndicatorDefaultProps>;
type Props = Readonly<StatusIndicatorProps>;

class StatusIndicator extends Component<Props> {
    public static readonly defaultProps: DefaultProps = {
        status: SimStatusEnum.Ok,
        className: "",
    };

    render() {
        return (
            <div className={`circle-${this.props.status === undefined ? "ok" : this.props.status.toString()}`}/>
        );
    }
}

export default StatusIndicator;
