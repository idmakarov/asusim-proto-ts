import ReactDataGrid from "@inovua/reactdatagrid-community";
import { ChangeEvent, Component, ReactNode } from "react";
import "../styles/containers.css"
import '@inovua/reactdatagrid-community/index.css'
import { TypeRowProps } from "@inovua/reactdatagrid-community/types";
import dataGridStyle from "../styles/dataGridStyle";


interface SimGridContainerDefaultProps {
    title?: string;
    noDataComponent?: ReactNode;
    showHeader?: boolean;
    isFilteringEnabled?: boolean;
    filterBy?: string;
}

interface SimGridContainerProps extends SimGridContainerDefaultProps {
    dataSource: {}[];
    columns: {}[];
    onRowClick?: (rowProps: TypeRowProps, event: MouseEvent) => void;
    onRowDoubleClick?: (event: MouseEvent, rowProps: TypeRowProps) => void;
}

type DefaultProps = Readonly<SimGridContainerDefaultProps>;
type Props = Readonly<SimGridContainerProps>;


interface SimGridContainerState {
    filterText?: string;
}

type State = Readonly<SimGridContainerState>;


class SimGridContainer extends Component<Props, State> {
    public static readonly defaultProps: DefaultProps = {
        title: undefined,
        noDataComponent: <span className='container-text-S'>Нет записей для отображения</span>,
        showHeader: true,
        isFilteringEnabled: false,
        filterBy: "",
    };

    public readonly state: State = {
        filterText: "",
    };

    constructor(props: Props) {
        super(props);

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({filterText: e.target.value});
    }

    render() {
        const data = this.props.isFilteringEnabled
            ? this.props.dataSource.filter(
                (item: any) => item.name && (item.name.toLowerCase().includes(this.state.filterText?.toLowerCase()) || !this.state.filterText)
            )
            : this.props.dataSource;

        const showHeader = data?.length > 0 && this.props.showHeader === true;

        return (
            <div className='container-base'>
                <div className='stackpanel-vertical-padding10-gap10'>
                    {
                        this.props.title !== undefined && <span className='container-text-M'>{this.props.title}</span>
                    }
                    {
                        this.props.isFilteringEnabled
                        && <input
                            className='textbox-filter'
                            type={'text'}
                            value={this.state.filterText}
                            onChange={this.handleFilterTextChange}
                        />
                    }
                    <ReactDataGrid
                        idProperty='id'
                        theme="default-light"
                        columns={this.props.columns}
                        dataSource={data}
                        style={dataGridStyle}
                        showZebraRows={false}
                        onRowClick={this.props.onRowClick}
                        onRowDoubleClick={this.props.onRowDoubleClick}
                        emptyText={this.props.noDataComponent}
                        showHeader={showHeader}
                        showColumnMenuTool={false}
                    />
                </div>
            </div>
        );
    }
}

export default SimGridContainer;