import { configureStore } from '@reduxjs/toolkit'
import sessionInfoSlice from './sessionInfoSlice';
import simStateSlice from './simStateSlice';
import stateSlice from './stateSlice';

const store = configureStore({
  	reducer: {
		state: stateSlice,
		simState: simStateSlice,
		sessionInfo: sessionInfoSlice,
	}
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch