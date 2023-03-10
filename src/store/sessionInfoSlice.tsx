import { createSlice } from "@reduxjs/toolkit";

export const sessionInfoSlice = createSlice({
    name: "sessionInfo",
    initialState: {
        sessionId: ""
    },
    reducers: {
        setSessionInfo: (state, action) => {
            if (state.sessionId !== action.payload)
            {
                return {
                    sessionId: action.payload
                }
            }
        },
        resetSessionInfo: () => {
            return {
                sessionId: ""
            }
        }
    }
})

export const { setSessionInfo, resetSessionInfo } = sessionInfoSlice.actions

export default sessionInfoSlice.reducer