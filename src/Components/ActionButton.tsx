import React, { ReactNode } from "react";

interface ActionButtonDefaultProps {
    isEnabled: boolean;
    isSubmitButton: boolean;
    children?: ReactNode;
    className: string;
}

interface ActionButtonProps extends ActionButtonDefaultProps {
    onButtonClick: () => void;
}

type DefaultProps = Readonly<ActionButtonDefaultProps>;
type Props = Readonly<ActionButtonProps>;

class ActionButton extends React.Component<Props> {
    public static readonly defaultProps: DefaultProps = {
        isEnabled: true,
        isSubmitButton: false,
        children: [],
        className: "",
    };

    constructor(props: Props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        if (this.props.onButtonClick !== null)
            this.props.onButtonClick();
    }

    render() {
        return (
            <button
                className={this.props.className}
                onClick={this.handleOnClick}
                type={this.props.isEnabled && this.props.isSubmitButton ? 'submit' : 'button'}
                disabled={!this.props.isEnabled}
            >
                    {this.props.children}
            </button>
        );
    }
}

export default ActionButton;
