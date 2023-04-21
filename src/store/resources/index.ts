import { Reducer } from '@reduxjs/toolkit';
import * as asyncActions from './actions';
import { DevBySlice, DevByState } from './slice';

export const DevByActions = { ...DevBySlice.actions, ...asyncActions };
export const DevByReducer: Reducer<DevByState> = DevBySlice.reducer;

export * as DevBySelectors from './selectors';

