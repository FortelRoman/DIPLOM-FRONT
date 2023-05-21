import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {deleteItem, getItems} from "./actions";
import {TUsersData} from "../../types/user";

export type UsersState = {
	data: TUsersData;
	loading: boolean;
	error: string;
};

const initialState: UsersState = {
	data: {},
	loading: false,
	error: '',
};

export const UsersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {	},
	extraReducers: {
		[getItems.fulfilled.type]: (state, action: PayloadAction<TUsersData>) => {
			state.loading = false;
			state.error = '';
			state.data = action.payload;
		},
		[getItems.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.loading = false;
		},
		[getItems.pending.type]: (state) => {
			state.loading = true;
		},

		[deleteItem.fulfilled.type]: (state) => {
			state.loading = false;
			state.error = '';
		},
		[deleteItem.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.loading = false;
		},
		[deleteItem.pending.type]: (state) => {
			state.loading = true;
		},
	},
});