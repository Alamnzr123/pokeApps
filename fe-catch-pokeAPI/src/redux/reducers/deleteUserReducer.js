import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteUsersAction = createAsyncThunk(
    "Users/deleteUsers",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/hapusdata/${id}`);
            console.log(response.data);

        } catch (error) {
            return rejectWithValue("Delete User error");
        }
    },
);


const deleteUsersSlice = createSlice({
    name: "deleteUsers",
    initialState: {
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(deleteUsersAction.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(deleteUsersAction.fulfilled, (state) => {
            state.isLoading = false;
        });

        builder.addCase(deleteUsersAction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action?.payload;
        });
    },
});

export default deleteUsersSlice.reducer;