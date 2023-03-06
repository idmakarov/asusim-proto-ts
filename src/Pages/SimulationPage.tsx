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
import StubDataType from "src/models/stubDataModel";
import StateType from "src/models/stateModel";
import SimVariableType from "src/models/simVariableModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { updateState } from "src/store/stateSlice";

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

const listenUrl = (
    `${GatewayURL}${StubRequestDict.listen}?` +
    new URLSearchParams([['ms', '1000'], ['f', '10']])
);
const eventSourceController = new StubController(listenUrl);

function SimulationPage() {    
    const [simState, setSimState] = useState(SimStateEnum.InitialState);
    // const [state, setState] = useState(initState);
    
    const state = useSelector((state: RootState) => state.state);
    const dispatch = useDispatch();
    const dispatchUpdateData = (data: string) => dispatch(updateState(data));

    const startSimuluation = () => {
        setSimState(SimStateEnum.Idle);

        const url = (
            `${GatewayURL}${StubRequestDict.start}`//?` +
            //new URLSearchParams({ modelId: '0' })
        );
        fetch(url, { method: "GET" })
            .then(
                (response) => response.status === 200
                ? setSimState(SimStateEnum.Started)
                : setSimState(SimStateEnum.CriticalError),
                (reason) => alert(reason)
            )
            .catch((err) => setSimState(SimStateEnum.CriticalError));

        eventSourceController.mount(dispatchUpdateData);
    };

    const stopAndInit = () => {
        setSimState(SimStateEnum.Stopped);
        setInterval(
            () => setSimState(SimStateEnum.InitialState),
            500
        );
    }

    const stopSimulation = () => {
        setSimState(SimStateEnum.Idle);

        const url = (
            `${GatewayURL}${StubRequestDict.end}`//?` +
            //new URLSearchParams({ sessionId: '0' })
        );
        fetch(url, { method: "GET" })
            .then(
                (response) => response.status === 200
                ? stopAndInit()
                : setSimState(SimStateEnum.CriticalError),
                (reason) => alert(reason)//stopAndInit()
            )
            .catch((err) => setSimState(SimStateEnum.CriticalError));

        eventSourceController.unmount();
    };

    // const updateData = (responseResult: string) => {
    //     try {
    //         const parsedData: StubDataType = JSON.parse(responseResult);
    //         const newSimTime = new Date(parsedData.SimTime);

    //         if (newSimTime !== state.SimTime) {
    //             const dataArray = Object.entries(parsedData.Data);
    //             const newSimData: SimVariableType[] = dataArray.map(
    //                 (pair, index: number) => (
    //                     {
    //                         id: index,
    //                         name: pair[0],
    //                         value: Number.parseFloat(pair[1]),
    //                         isOnChart: false,
    //                         color: "",
    //                     }
    //                 )
    //             );

    //             const newState: StateType = {
    //                 SimTime: newSimTime,
    //                 Data: newSimData,
    //                 SessionId: parsedData.SessionId,
    //             };

    //             setState(newState);
    //         }
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // };

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
                        simTime={new Date(state.SimTime)}
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
