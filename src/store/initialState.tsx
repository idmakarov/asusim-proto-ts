import MimicDataType from "../models/mimicDataModel";
import StateType from "../models/stateModel";
import { SimStateEnum } from "../utils/simEnums";

interface IGlobalState {
    state: StateType;
    simState: SimStateEnum;
    chartData: Map<string, number>[];
    mimicData: MimicDataType;
};

const today = new Date();

const mimicList = [
    {
        id: 1,
        name: "Мнемосхема - 1"
    },
    {
        id: 2,
        name: "Текущие сообщения",
    },
]

const initialState: IGlobalState = {
    state: {
        SimTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
        Data: [],
    },
    simState: SimStateEnum.InitialState,
    chartData: [],
    mimicData: {
        mimicList: mimicList,
        selectedId: 1,
    },
};

export default initialState;