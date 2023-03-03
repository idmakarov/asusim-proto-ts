import { GutterTheme, SplitDirection } from "@devbookhq/splitter";
import MimicContainer from "src/Components/MimicContainer";
import SimChartContainer from "src/Components/SimChartContainer";
import "src/styles/pages.css";
import "src/styles/containers.css";
import { SimActionEnum, SimStateEnum } from "src/utils/simEnums";
import ControlPanel from "../Components/ControlPanel";
import GridSplitter from "../Components/GridSplitter";
import SimGridContainer from "src/Components/SimGridContainer";
import { useState } from "react";
import { GatewayURL, StubRequestDict } from "src/configs/config";
import StubController from "src/API/stubController";
import { mimicTableColumns, simVariableTableColumns, variableTableColumns } from "src/configs/simTablesConfig";
import StubDataType from "src/models/stubModel";
import StateType from "src/models/stateModel";

const today = new Date();

const mimicTableData = [
    {
        id: 1,
        name: 'Мнемосхема - 1'
    },
    {
        id: 2,
        name: 'Текущие сообщения',
    },
];

function SimulationPage() {
    const initState: StateType = {
        SimTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
        Data: [],
        SessionId: "",
    };

    const eventSourceController = new StubController(`${GatewayURL}${StubRequestDict.listen}`);
    
    const [simState, setSimState] = useState(SimStateEnum.InitialState);
    const [state, setState] = useState(initState);

    const startSimuluation = () => {
        setSimState(SimStateEnum.Started);
        fetch(`${GatewayURL}${StubRequestDict.start}`, {method: "GET"})
            .then((response) => response.status === 200 ? response.json() : setSimState(SimStateEnum.CriticalError))
            .catch((err) => setSimState(SimStateEnum.CriticalError));

        eventSourceController.mount(updateData);
    };

    const stopSimulation = () => {
        setSimState(SimStateEnum.Stopped);
        eventSourceController.unmount();
    };

    const updateData = (responseResult: string) => {
        const parsedData: StubDataType = JSON.parse(responseResult);
        if (parsedData.SimTime !== state.SimTime) {
            const newData: StateType = {
                SimTime: parsedData.SimTime,
                Data: parsedData.Data.map(
                    (pair: { key: string, value: number }, index: number) => {
                        return ({
                            id: index,
                            variableName: pair.key,
                            value: pair.value,
                        });
                    }),
                SessionId: "",
            };

            setState(newData);
        }
    };

    const onActionChanged = (simAction: SimActionEnum) => {
        switch(simAction) {
            case SimActionEnum.Start:
                startSimuluation();
                break;

            case SimActionEnum.Stop:
                stopSimulation();
                break;

            default:
                break;
        }
    };

    return (
        <>
            <div className="page">
                <div className="container-simulation">
                    <ControlPanel
                        handleActionChanged={onActionChanged}
                        simState={simState}
                        simTime={state.SimTime}
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
                            <SimGridContainer
                                dataSource={state.Data}
                                columns={variableTableColumns}
                                title="Переменные"
                                isFilteringEnabled
                            />
                            <SimGridContainer
                                dataSource={mimicTableData}
                                columns={mimicTableColumns}
                                title="Мнемосхемы"
                                isFilteringEnabled
                            />
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
                            <SimGridContainer
                                dataSource={[]}
                                columns={simVariableTableColumns}
                                title="Переменные для графика"
                            />
                            <SimChartContainer />
                        </GridSplitter>
                    </GridSplitter>
                </div>
            </div>
        </>
    );
};

export default SimulationPage;
