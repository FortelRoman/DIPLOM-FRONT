import { Reducer } from '@reduxjs/toolkit';
import * as asyncActions from './actions';
import { UsersSlice, UsersState } from './slice';

export const UsersActions = { ...UsersSlice.actions, ...asyncActions };
export const UsersReducer: Reducer<UsersState> = UsersSlice.reducer;

export * as UsersSelectors from './selectors';

