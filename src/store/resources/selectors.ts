import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../store";

const getState = (state: RootState) => state.devBy;
export const data = createSelector(getState, (state) => state.data);
export const uploadData = createSelector(getState, (state) => state.uploadData);
export const uploadDataLoading = createSelector(getState, (state) => state.uploadDataLoading);
export const loading = createSelector(getState, (state) => state.dataLoading);
