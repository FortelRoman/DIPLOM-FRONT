import { createSelector } from '@reduxjs/toolkit';
import {RootState} from "../store";

const getState = (state: RootState) => state.users;
export const data = createSelector(getState, (state) => state.data.filter(({role}) => role !== 'ADMIN'));
export const loading = createSelector(getState, (state) => state.loading);
