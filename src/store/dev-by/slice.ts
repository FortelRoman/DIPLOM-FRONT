import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {deleteItem, getItems, parseItem} from "./actions";

export type DevByState = {
	data: any[];
	uploadData: any,
	uploadDataLoading: boolean,
	error: string;
	isLoading: boolean;
};

const initialState: DevByState = {
	data: [],
	uploadData: null,
	uploadDataLoading: false,
	error: '',
	isLoading: false,
};

export const DevBySlice = createSlice({
	name: 'dev-by',
	initialState,
	reducers: {
		resetUploadData: (state) => {
			state.uploadData = null;
		}
	},
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

		[parseItem.fulfilled.type]: (state, action: PayloadAction<any>) => {
			state.uploadData = action.payload;
			state.uploadDataLoading = false;
			state.error = '';
		},
		[parseItem.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.uploadDataLoading = false;
		},
		[parseItem.pending.type]: (state) => {
			state.uploadDataLoading = true;
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
