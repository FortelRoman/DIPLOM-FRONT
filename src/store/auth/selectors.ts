import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../store";

const getState = (state: RootState) => state.profile;
export const isLogin = createSelector(getState, (state) => state.isLogin);
export const isLoading = createSelector(getState, (state) => state.isLoading);
export const error = createSelector(getState, (state) => state.error);
export const username = createSelector(getState, (state) => state.profile.username);
export const role = createSelector(getState, (state) => state.profile.role);
export const isAdmin = createSelector(getState, (state) => state.profile.role === 'ADMIN');
export const isAnalyst = createSelector(getState, (state) => state.profile.role === 'ANALYST');
export const profile = createSelector(getState, (state) => state.profile);
