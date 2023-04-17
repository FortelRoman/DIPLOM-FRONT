import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../store";

const getState = (state: RootState) => state.devBy;
export const data = createSelector(getState, (state) => state.data);
export const loading = createSelector(getState, (state) => state.isLoading);
