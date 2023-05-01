import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from "../../api/api";

type TCredentials = {
	username: string,
	password: string,
}

export const register = createAsyncThunk('auth/register', async ({username, password}: TCredentials, thunkAPI) => {
	try {
		const response = await $api.post('/api/auth/register', {username, password})
		return response.data;
	} catch (error) {
		// @ts-ignore
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
});

export const login = createAsyncThunk('auth/login', async ({username, password}: TCredentials, thunkAPI) => {
	try {
		const response = await $api.post('/api/auth/login', {username, password})
		return response.data;
	} catch (error) {
		console.log(error)
		// @ts-ignore
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
});

export const getProfile = createAsyncThunk('auth/profile', async (_, thunkAPI) => {
	try {
		const response = await $api.get('/api/auth/profile')
		return response.data.profile;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
