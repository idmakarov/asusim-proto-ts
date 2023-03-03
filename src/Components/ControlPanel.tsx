import { Component } from "react";
import ActionButton from "./ActionButton";
import StatusIndicator from "./StatusIndicator";
import TimeString from "./TimeString";
import "src/styles/buttons.css";
import "src/styles/containers.css";
import "src/styles/figures.css";
import { SimActionEnum, SimStateEnum } from "src/utils/simEnums";
import { simStateToStatus } from "src/utils/simHelpers";

interface ControlPanelDefaultProps {
    className: string;
}

interface ControlPanelProps extends ControlPanelDefaultProps {
    simTime: Date;
    simState: SimStateEnum;
    handleActionChanged: (action: SimActionEnum) => void;
}

type DefaultProps = Readonly<ControlPanelDefaultProps>;
type Props = Readonly<ControlPanelProps>;

class ControlPanel extends Component<Props> {
    public static readonly defaultProps: DefaultProps = {
        className: "container-header",
    };

    constructor(props: Props) {
        super(props);
        
        this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
        this.handlePauseButtonClick = this.handlePauseButtonClick.bind(this);
        this.handleStopButtonClick = this.handleStopButtonClick.bind(this);
    }

    handlePlayButtonClick() {
        this.props.handleActionChanged(SimActionEnum.Start);
    }

    handlePauseButtonClick() {
        this.props.handleActionChanged(SimActionEnum.Pause);
    }

    handleStopButtonClick() {
        this.props.handleActionChanged(SimActionEnum.Stop);
    }
    
    render() {
        return (
            <div className={this.props.className}>
                <div className="stackpanel-horizontal"/>
                <div className="stackpanel-horizontal">
                    <ActionButton
                        className="button-sim-control"
                        onButtonClick={this.handlePlayButtonClick}
                        isEnabled={
                            this.props.simState !== SimStateEnum.Started &&
                            this.props.simState !== SimStateEnum.Stopped &&
                            this.props.simState !== SimStateEnum.Idle
                        }
                    >
                        <div className="triangle-play"/>
                    </ActionButton>
                    <ActionButton
                        className="button-sim-control"
                        onButtonClick={this.handlePauseButtonClick}
                        isEnabled={this.props.simState === SimStateEnum.Started}
                    >
                        <div className="stackpanel-horizontal">
                            <div className="rectangle-pause"/>
                            <div className="rectangle-pause2"/>
                        </div>
                    </ActionButton>
                    <ActionButton
                        className="button-sim-control"
                        onButtonClick={this.handleStopButtonClick}
                        isEnabled={
                            this.props.simState === SimStateEnum.Started ||
                            this.props.simState === SimStateEnum.Paused
                        }
                    >
                        <div className="rectangle-stop"/>
                    </ActionButton>
                </div>
                <div className="stackpanel-horizontal-gap10">
                    <StatusIndicator status={simStateToStatus(this.props.simState)}/>
                    <span className="container-text-L">{this.props.simState}</span>
                </div>
                <div className="stackpanel-horizontal-gap10">
                    <span className="container-text-L">Время симуляции:</span>
                    <TimeString time={this.props.simTime}/>
                </div>
            </div>
        );
    }
}

export default ControlPanel;