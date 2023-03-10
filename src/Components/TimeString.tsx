import { Component } from "react";
import "../styles/containers.css"

interface TimeStringDefaultProps {
    className?: string;
}

interface TimeStringProps extends TimeStringDefaultProps {
    time?: Date;
}

type DefaultProps = Readonly<TimeStringDefaultProps>;
type Props = Readonly<TimeStringProps>;

class TimeString extends Component<Props> {
    public static readonly defaultProps: DefaultProps = {
        className: "container-text-L"
    };

    render() {
        return (
            <span className={this.props.className}>
                {this.props.time === undefined ? "##:##:##" : this.props.time.toLocaleTimeString()}
            </span>
        );
    }
}

export default TimeString;