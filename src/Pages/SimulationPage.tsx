import { GutterTheme, SplitDirection } from "@devbookhq/splitter";
import MimicContainer from "../Components/MimicContainer";
import SimChartContainer from "../Components/SimChartContainer";
import "../styles/pages.css";
import "../styles/containers.css";
import { SimActionEnum, SimStateEnum } from "../utils/simEnums";
import ControlPanel from "../Components/ControlPanel";
import GridSplitter from "../Components/GridSplitter";
import SimGridContainer from "../Components/SimGridContainer";
import { useState } from "react";
import { ApiRequestDict, GatewayURL, StubRequestDict } from "../configs/config";
import StubController from "../API/stubController";
import { mimicTableColumns, simVariableTableColumns, variableTableColumns } from "../configs/simTablesConfig";
import StubDataType from "../models/stubDataModel";
import StateType from "../models/stateModel";
import SimVariableType from "../models/simVariableModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateState } from "../store/stateSlice";
import { fromJSON } from "../utils/jsonConverter";
import { setSessionInfo } from "../store/sessionInfoSlice";
import { setSimState } from "../store/simStateSlice";

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
    const state = useSelector((state: RootState) => state.state);
    const dispatch = useDispatch();
    const dispatchUpdateData = (data: string) => dispatch(updateState(data));

    const sessionInfo = useSelector((state: RootState) => state.sessionInfo);
    const simState = useSelector((state: RootState) => state.simState);

    const eventSourceController = new StubController();

    const startSimuluation = () => {
        dispatch(setSimState(SimStateEnum.Idle));

        const url = (
            // `${GatewayURL}${StubRequestDict.start}`
            `${GatewayURL}${ApiRequestDict.start}?` +
            new URLSearchParams([['periodMs', '1000'], ['fields', '10']])
        );
        fetch(url, { method: "GET" })
            .then(response => {
                    if (response.status === 200) {
                        dispatch(setSimState(SimStateEnum.Started));
                        return response.json();
                    } else {
                        dispatch(setSimState(SimStateEnum.CriticalError));
                    }
                },
                (reason) => alert(reason)
            )
            .then(guid => {
                dispatch(setSessionInfo(guid));

                const listenUrl = (
                    // `${GatewayURL}${StubRequestDict.listen}?` +
                    `${GatewayURL}${ApiRequestDict.listen}?` +
                    new URLSearchParams([['s', guid]])
                );
                eventSourceController.mount(listenUrl, dispatchUpdateData);
            })
            .catch(() => dispatch(setSimState(SimStateEnum.CriticalError)));
    };

    const stopAndInit = () => {
        dispatch(setSimState(SimStateEnum.Stopped));
        setTimeout(
            () => dispatch(setSimState(SimStateEnum.InitialState)),
            500
        );
    }

    const stopSimulation = () => {
        dispatch(setSimState(SimStateEnum.Idle));

        const url = (
            // `${GatewayURL}${StubRequestDict.end}`
            `${GatewayURL}${ApiRequestDict.end}?` +
            new URLSearchParams([['sessionId', sessionInfo.sessionId]])
        );
        fetch(url, { method: "GET" })
            .then(
                response => response.status === 200
                ? stopAndInit()
                : dispatch(setSimState(SimStateEnum.CriticalError)),
                reason => alert(reason)//stopAndInit()
            )
            .catch(() => dispatch(setSimState(SimStateEnum.CriticalError)));

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
                        simState={simState.simState}
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
