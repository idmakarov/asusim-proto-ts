import { GutterTheme, SplitDirection } from "@devbookhq/splitter";
import "src/styles/containers.css";
import ControlPanel, { SimStateEnum } from "../ControlPanel";
import GridSplitter from "../GridSplitter";

const today = new Date();

const SimulationPage = () => (
    <>
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
                        
                    </GridSplitter>
                    <GridSplitter
                        splitterIdx={2}
                        direction={SplitDirection.Horizontal}
                        gutterTheme={GutterTheme.Light}
                        minWidths={[200, 100]}
                        initialSizes={[25, 75]}
                        handleResizeFinished={undefined}
                    >
                        
                    </GridSplitter>
            </GridSplitter>
        </div>
    </>
);

export default SimulationPage;
