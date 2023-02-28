import { GutterTheme, SplitDirection } from "@devbookhq/splitter";
import MimicContainer from "src/Components/MimicContainer";
import SimChartContainer from "src/Components/SimChartContainer";
import "src/styles/pages.css";
import "src/styles/containers.css";
import { SimStateEnum } from "src/utils/sim-enums";
import ControlPanel from "../Components/ControlPanel";
import GridSplitter from "../Components/GridSplitter";

const today = new Date();

const SimulationPage = () => (
    <>
        <div className="page">
            <div className="container-simulation">
                <ControlPanel
                    handleActionChanged={() => {}}
                    simState={SimStateEnum.InitialState}
                    simTime={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)}
                />
                <GridSplitter
                    splitterIdx={0}
                    direction={SplitDirection.Vertical}
                    gutterTheme={GutterTheme.Light}
                    minHeights={[50, 0]}
                    initialSizes={[75, 25]}
                    handleResizeFinished={undefined}
                >
                    <GridSplitter
                            splitterIdx={1}
                            direction={SplitDirection.Horizontal}
                            gutterTheme={GutterTheme.Light}
                            minWidths={[200, 200, 400]}
                            initialSizes={[17, 23, 60]}
                            handleResizeFinished={undefined}
                        >
                            <div className="container-base" />
                            <div className="container-base" />
                            <MimicContainer />
                        </GridSplitter>
                        <GridSplitter
                            splitterIdx={2}
                            direction={SplitDirection.Horizontal}
                            gutterTheme={GutterTheme.Light}
                            minWidths={[200, 200]}
                            initialSizes={[25, 75]}
                            handleResizeFinished={undefined}
                        >
                            <div className="container-base" />
                            <SimChartContainer />
                        </GridSplitter>
                </GridSplitter>
            </div>
        </div>
    </>
);

export default SimulationPage;
