import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from "../../api/api";
import {TRole} from "../../types/role";

export const getItems = createAsyncThunk('users/get-items', async (_, thunkAPI) => {
	try {
		const response = await $api.get('/api/users');
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const deleteItem = createAsyncThunk('users/delete-item', async (id: string, thunkAPI) => {
	try {
		const response = await $api.delete(`/api/users/${id}`);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});


type TUpdate = {
	id: string,
	role: TRole,
}
export const updateRoleItem = createAsyncThunk('users/delete-item', async ({id, role}: TUpdate, thunkAPI) => {
	try {
		const response = await $api.put(`/api/users/${id}`, {
			role
		});
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});