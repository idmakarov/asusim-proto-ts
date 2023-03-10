import { createSlice } from "@reduxjs/toolkit";
import ApiDataType, { apiDataTypeMap } from "models/apiDataModel";
import SimVariableType from "../models/simVariableModel";
import StateType from "../models/stateModel";
import StubDataType, { stubDataTypeMap } from "../models/stubDataModel";
import { fromJSON } from "../utils/jsonConverter";

const today = new Date();

const initialState: StateType = {
    SimTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
    Data: [],
};

export const stateSlice = createSlice({
    name: "state",
    initialState: {
        ...initialState,
        SimTime: initialState.SimTime.toString()
    },
    reducers: {
        updateState: (state, action) => {
            // const parsedData: StubDataType = fromJSON<StubDataType>(action.payload, "StubDataType", stubDataTypeMap);
            const parsedData: ApiDataType = fromJSON<ApiDataType>(action.payload, "ApiDataType", apiDataTypeMap);

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