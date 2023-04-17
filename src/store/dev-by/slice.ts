import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {deleteItem, getItems} from "./actions";

export type DevByState = {
	data: any[];
	error: string;
	isLoading: boolean;
};

const initialState: DevByState = {
	data: [],
	error: '',
	isLoading: false,
};

export const DevBySlice = createSlice({
	name: 'dev-by',
	initialState,
	reducers: {},
	extraReducers: {
		[getItems.fulfilled.type]: (state, action: PayloadAction<any[]>) => {
			state.isLoading = false;
			state.error = '';
			state.data = action.payload;
		},
		[getItems.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		[getItems.pending.type]: (state) => {
			state.isLoading = true;
		},

		[deleteItem.fulfilled.type]: (state) => {
			state.isLoading = false;
			state.error = '';
		},
		[deleteItem.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		[deleteItem.pending.type]: (state) => {
			state.isLoading = true;
		},
	},
});
