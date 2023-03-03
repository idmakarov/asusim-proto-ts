import { Component, ReactNode } from "react";
import ReactSplit, { GutterTheme, SplitDirection } from "@devbookhq/splitter";

interface GridSplitterDefaultProps {
    direction?: SplitDirection;
    minWidths?: number[];
    minHeights?: number[];
    initialSizes?: number[];
    gutterTheme?: GutterTheme;
    gutterClassName?: string;
    draggerClassName?: string;
    handleResizeStarted?: (splitterIdx?: number, id?: number) => void;
    handleResizeFinished?: (splitterIdx?: number, id?: number, newSizes?: number[]) => void;
    classes?: string[];
    children?: ReactNode;
    splitterIdx?: number;
}

interface GridSplitterProps extends GridSplitterDefaultProps {}

type DefaultProps = Readonly<GridSplitterDefaultProps>;
type Props = Readonly<GridSplitterProps>;

class GridSplitter extends Component<Props> {
    public static readonly defaultProps: DefaultProps = {
        direction: undefined,
        minWidths: undefined,
        minHeights: undefined,
        initialSizes: undefined,
        gutterTheme: undefined,
        gutterClassName: undefined,
        draggerClassName: undefined,
        handleResizeStarted: undefined,
        handleResizeFinished: undefined,
        classes: undefined,
        children: undefined,
        splitterIdx: undefined,
    };

    constructor(props: Props) {
        super(props);
        
        this.handleResizeStarted = this.handleResizeStarted.bind(this);
        this.handleResizeFinished = this.handleResizeFinished.bind(this);
    }

    handleResizeStarted(id: number) {
        if (this.props.handleResizeStarted !== undefined) {
            this.props.handleResizeStarted(this.props.splitterIdx, id);
        }
    }

    handleResizeFinished(id: number, newSizes: number[]) {
        if (this.props.handleResizeFinished !== undefined) {
            this.props.handleResizeFinished(this.props.splitterIdx, id, newSizes);
        }
    }

    render() {
        return (
            <ReactSplit
                direction={this.props.direction}
                minWidths={this.props.minWidths}
                minHeights={this.props.minHeights}
                initialSizes={this.props.initialSizes}
                gutterTheme={this.props.gutterTheme}
                gutterClassName={this.props.gutterClassName}
                draggerClassName={this.props.draggerClassName}
                onResizeStarted={this.handleResizeStarted}
                onResizeFinished={this.handleResizeFinished}
                classes={this.props.classes}
            >
                {this.props.children}
            </ReactSplit>
        );
    }
}

export default GridSplitter;