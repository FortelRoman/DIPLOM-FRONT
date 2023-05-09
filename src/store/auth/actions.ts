import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from "../../api/api";
import {TLogin, TRegister} from "../../types/user";

export const register = createAsyncThunk('auth/register', async (credentials: TRegister, thunkAPI) => {
	try {
		const response = await $api.post('/api/auth/register', credentials)
		return response.data;
	} catch (error) {
		// @ts-ignore
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
});

export const login = createAsyncThunk('auth/login', async (credentials: TLogin, thunkAPI) => {
	try {
		const response = await $api.post('/api/auth/login', credentials)
		return response.data;
	} catch (error) {
		console.log(error)
		// @ts-ignore
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	try {
		const response = await $api.post('/api/auth/logout')
		return response.data;
	} catch (error) {
		// @ts-ignore
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
});

export const getProfile = createAsyncThunk('auth/profile', async (_, thunkAPI) => {
	try {
		const response = await $api.get('/api/auth/profile')
		return response.data.profile;
	} catch (error) {
		// @ts-ignore
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
});


type TUpdate = {
	username?: string,
	login?: string,
	password?: string,
	oldPassword?: string,
}
export const updateProfile = createAsyncThunk('auth/put', async (data: TUpdate, thunkAPI) => {
	try {
		const response = await $api.put('/api/profile', data)
		return response.data;
	} catch (error) {
		// @ts-ignore
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
});
