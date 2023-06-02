import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {register, login, getProfile, updateProfile, logout} from "./actions";
import {TRole} from "../../types/role";

type TProfile = {
	username: string,
	role: TRole,
	login: string,
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
		role: 'UNKNOWN',
		login: '',
	}
};

export const ProfileSlice = createSlice({
	name: 'dev-by',
	initialState,
	reducers: {	},
	extraReducers: {
		[login.fulfilled.type]: (state) => {
			state.isLoading = false;
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
			state.isLoading = false;
			state.profile = action.payload;
			state.isLogin = true;
		},
		[getProfile.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		[getProfile.pending.type]: (state) => {
			state.isLoading = true;
			state.error = '';
		},

		[updateProfile.fulfilled.type]: (state) => {
			state.isLoading = false;
			state.error = '';
		},
		[updateProfile.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		[updateProfile.pending.type]: (state) => {
			state.isLoading = true;
			state.error = '';
		},

		[logout.fulfilled.type]: (state) => {
			state.isLoading = false;
			state.error = '';
			state.profile = initialState.profile;
		},
		[logout.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		[logout.pending.type]: (state) => {
			state.isLoading = true;
			state.error = '';
		},
	},
});