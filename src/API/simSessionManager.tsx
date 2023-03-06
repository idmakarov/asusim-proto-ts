// import { useState } from "react";
// import { GatewayURL, StubRequestDict } from "src/configs/config";
// import StateType from "src/models/stateModel";
// import StubDataType from "src/models/stubModel";
// import { SimStateEnum, SimActionEnum } from "src/utils/simEnums";
// import StubController from "./stubController";

// const today = new Date();

class SimSessionManager {
    // private readonly initState: StateType = {
    //     SimTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
    //     Data: [],
    //     SessionId: "",
    // };

    // private readonly listenUrl = (
    //     `${GatewayURL}${StubRequestDict.listen}?` +
    //     new URLSearchParams([['ms', '1000'], ['f', '10']])
    // );

    // private readonly eventSourceController = new StubController(this.listenUrl);

    // public simState: SimStateEnum;
    // private setSimState: (state: SimStateEnum) => void;

    // constructor() {
    //     [this.simState, this.setSimState] = useState(SimStateEnum.InitialState);
    // }
    
    // const [simState, setSimState] = useState(SimStateEnum.InitialState);
    // const [state, setState] = useState(initState);

    // const startSimuluation = () => {
    //     setSimState(SimStateEnum.Idle);

    //     const url = (
    //         `${GatewayURL}${StubRequestDict.start}?` +
    //         new URLSearchParams({ modelId: '0' })
    //     );
    //     fetch(url, {
    //         method: "GET",
    //         headers: {
    //             'Content-type': 'text/plain',
    //         }
    //     })
    //         .then(
    //             (response) => response.status === 200
    //             ? setSimState(SimStateEnum.Started)
    //             : setSimState(SimStateEnum.CriticalError)
    //         )
    //         .catch((err) => setSimState(SimStateEnum.CriticalError));
        
    //     eventSourceController.mount(updateData);
    // };

    // const stopSimulation = () => {
    //     setSimState(SimStateEnum.Idle);

    //     const url = (
    //         `${GatewayURL}${StubRequestDict.end}?` +
    //         new URLSearchParams({ sessionId: '0' })
    //     );
    //     fetch(url, {
    //         method: "GET",
    //         headers: {
    //             'Content-type': 'text/plain'
    //         }
    //     })
    //         .then(
    //             (response) => response.status === 200
    //             ? setSimState(SimStateEnum.Stopped)
    //             : setSimState(SimStateEnum.CriticalError)
    //         )
    //         .catch((err) => setSimState(SimStateEnum.CriticalError));

    //     eventSourceController.unmount();
    // };

    // const updateData = (responseResult: string) => {
    //     const parsedData: StubDataType = JSON.parse(responseResult);
    //     if (parsedData.SimTime !== state.SimTime) {
    //         const newData: StateType = {
    //             SimTime: parsedData.SimTime,
    //             Data: parsedData.Data.map(
    //                 (pair: { key: string, value: number }, index: number) => {
    //                     return ({
    //                         id: index,
    //                         variableName: pair.key,
    //                         value: pair.value,
    //                     });
    //                 }),
    //             SessionId: "",
    //         };

    //         setState(newData);
    //     }
    // };

    // const onActionChanged = (simAction: SimActionEnum) => {
    //     switch(simAction) {
    //         case SimActionEnum.Start:
    //             startSimuluation();
    //             break;

    //         case SimActionEnum.Stop:
    //             stopSimulation();
    //             break;

    //         default:
    //             break;
    //     }
    // };
}

export default SimSessionManager;