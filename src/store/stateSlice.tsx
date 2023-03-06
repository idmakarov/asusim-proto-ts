import { createSlice } from "@reduxjs/toolkit";
import SimVariableType from "src/models/simVariableModel";
import StateType from "src/models/stateModel";
import StubDataType, { stubDataTypeMap } from "src/models/stubDataModel";
import { fromJSON } from "src/utils/jsonConverter";

const today = new Date();

const initialState: StateType = {
    SimTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
    Data: [],
    SessionId: "",
};

export const stateSlice = createSlice({
    name: "state",
    initialState: {
        ...initialState,
        SimTime: initialState.SimTime.toString()
    },
    reducers: {
        updateState: (state, action) => {
            const parsedData: StubDataType = fromJSON<StubDataType>(action.payload, "StubDataType", stubDataTypeMap);

            if (new Date(state.SimTime) !== parsedData.SimTime) {
                const newSimData: SimVariableType[] = Array.from(Object.entries(parsedData.Data)).map(
                    (pair, index) => (
                        {
                            id: index,
                            name: pair[0],
                            value: pair[1],
                            isOnChart: false,
                            color: "",
                        }
                    )
                );

                const newState = {
                    SimTime: parsedData.SimTime.toString(),
                    Data: newSimData,
                    SessionId: parsedData.SessionId,
                };

                return {
                    ...newState
                };
            }
        },
        resetState: () => {
            return {
                ...initialState,
                SimTime: initialState.SimTime.toString()
            };
        }
    }
})

export const { updateState, resetState } = stateSlice.actions

export default stateSlice.reducer