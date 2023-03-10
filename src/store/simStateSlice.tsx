import { createSlice } from "@reduxjs/toolkit";
import { SimStateEnum } from "../utils/simEnums";

export const simStateSlice = createSlice({
    name: "simState",
    initialState: {
        simState: SimStateEnum.InitialState
    },
    reducers: {
        setSimState: (state, action) => {
            if (state.simState !== action.payload)
            {
                return {
                    simState: action.payload
                }
            }
        },
        resetSimState: () => {
            return {
                simState: SimStateEnum.InitialState
            }
        }
    }
})

export const { setSimState, resetSimState } = simStateSlice.actions

export default simStateSlice.reducer