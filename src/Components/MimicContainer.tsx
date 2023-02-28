import React, { ReactNode } from "react";

interface MimicContainerDefaultProps {
    title?: string;
    noDataComponent?: ReactNode;
}

interface MimicContainerProps extends MimicContainerDefaultProps {
    mimic?: ReactNode;
}

type DefaultProps = Readonly<MimicContainerDefaultProps>;
type Props = Readonly<MimicContainerProps>;

class MimicContainer extends React.Component<Props> {
    public static readonly defaultProps: DefaultProps = {
        title: "Выбранная мнемосхема",
        noDataComponent: <span className="container-text-S">Нет записей для отображения</span>
    }

    render() {
        return (
            <div className='container-base'>
                <div className='stackpanel-vertical-padding10-gap10'>
                    <span className='container-text-M'>{this.props.title}</span>
                    {this.props.mimic === undefined ? this.props.noDataComponent : this.props.mimic}
                </div>
            </div>
        );
    }
}

export default MimicContainer;