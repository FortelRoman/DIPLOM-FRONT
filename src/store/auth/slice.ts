import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {register, login, getProfile} from "./actions";

type TProfile = {
	username: string,
	isAdmin: boolean,
}

export type ProfileState = {
	isLogin: boolean,
	isLoading: boolean,
	error: string,
	profile: TProfile
};

const initialState: ProfileState = {
	isLogin: false,
	isLoading: false,
	error: '',
	profile: {
		username: '',
		isAdmin: false,
	}
};

export const ProfileSlice = createSlice({
	name: 'dev-by',
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem('access_token')
			state.isLogin = false;
			state.profile = initialState.profile;
		}

	},
	extraReducers: {
		[login.fulfilled.type]: (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			localStorage.setItem('access_token', action.payload.access_token)
			state.error = '';
			state.isLogin = true;
		},
		[login.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		[login.pending.type]: (state) => {
			state.isLoading = true;
			state.error = '';
		},

		[register.fulfilled.type]: (state) => {
			state.isLoading = false;
			state.error = '';
		},
		[register.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		[register.pending.type]: (state) => {
			state.isLoading = true;
			state.error = '';
		},

		[getProfile.fulfilled.type]: (state, action: PayloadAction<TProfile>) => {
			state.profile = action.payload;
			state.isLogin = true;
		},

		// [parseItem.fulfilled.type]: (state, action: PayloadAction<any>) => {
		// 	state.uploadData = action.payload;
		// 	state.uploadDataLoading = false;
		// 	state.error = '';
		// },
		// [parseItem.rejected.type]: (state, action: PayloadAction<string>) => {
		// 	state.error = action.payload;
		// 	state.uploadDataLoading = false;
		// },
		// [parseItem.pending.type]: (state) => {
		// 	state.uploadDataLoading = true;
		// },
		//
		// [deleteItem.fulfilled.type]: (state) => {
		// 	state.dataLoading = false;
		// 	state.error = '';
		// },
		// [deleteItem.rejected.type]: (state, action: PayloadAction<string>) => {
		// 	state.error = action.payload;
		// 	state.dataLoading = false;
		// },
		// [deleteItem.pending.type]: (state) => {
		// 	state.dataLoading = true;
		// },
	},
});