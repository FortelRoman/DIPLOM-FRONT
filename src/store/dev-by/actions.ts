import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from "../../api/api";

export const getItems = createAsyncThunk('dev-by/get-items', async (_, thunkAPI) => {
	try {
		const response = await $api.get('/api/dev-by');
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const deleteItem = createAsyncThunk('dev-by/delete-item', async (id: string, thunkAPI) => {
	try {
		const response = await $api.delete(`/api/dev-by/${id}`);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

type TAdd = {date?: string, file?: Object};

export const addItem = createAsyncThunk('dev-by/add-item', async ({date, file} : TAdd, thunkAPI) => {
	try {
		const response = await $api.post(`/api/dev-by`, {file, date},  {headers: {'Content-type': 'application/json'}});
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const getItem = createAsyncThunk('dev-by/get-item', async (id: string, thunkAPI) => {
	try {
		const response = await $api.get(`/api/dev-by/${id}`);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const parseItem = createAsyncThunk('dev-by/parse-item', async (_, thunkAPI) => {
	try {
		const response = await $api.get('api/dev-by/parse');
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
