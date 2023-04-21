import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {deleteItem, getItems, parseItem} from "./actions";

export type DevByState = {
	data: any[];
	dataLoading: boolean;
	uploadData: any,
	uploadDataLoading: boolean,
	error: string;
};

const initialState: DevByState = {
	data: [],
	dataLoading: false,
	uploadData: null,
	uploadDataLoading: false,
	error: '',
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
			state.dataLoading = false;
			state.error = '';
			state.data = action.payload;
		},
		[getItems.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.dataLoading = false;
		},
		[getItems.pending.type]: (state) => {
			state.dataLoading = true;
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
			state.dataLoading = false;
			state.error = '';
		},
		[deleteItem.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.dataLoading = false;
		},
		[deleteItem.pending.type]: (state) => {
			state.dataLoading = true;
		},
	},
});