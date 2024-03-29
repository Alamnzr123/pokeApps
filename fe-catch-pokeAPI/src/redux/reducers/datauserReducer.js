import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    status: 'idle',
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    return response.data
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUserError = (state) => state.users.error;

export default userSlice.reducer;