import { Reducer } from '@reduxjs/toolkit';
import * as asyncActions from './actions';
import { ProfileSlice, ProfileState } from './slice';

export const ProfileActions = { ...ProfileSlice.actions, ...asyncActions };
export const ProfileReducer: Reducer<ProfileState> = ProfileSlice.reducer;

export * as ProfileSelectors from './selectors';

