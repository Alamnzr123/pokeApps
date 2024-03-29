import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const addUsersAction = createAsyncThunk(
    "Users/postUsers",
    async ({ data, saveImg }, { rejectWithValue }) => {
        try {
            if (
                data.username === "" ||
                data.password === "" ||
                data.level === ""
            ) {
                return rejectWithValue("Input is empty");
            }
            // const userData = {
            //     id: data.id,
            //     username: data.username,
            //     password: data.password,
            //     level: data.level,
            //     image: saveImg
            // };


            const formData = new FormData();
            formData.append("id", data.id);
            formData.append("username", data.username);
            formData.append("password", data.password);
            formData.append("level", data.level);
            formData.append("image", saveImg);

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tambahuser`, formData);

        } catch (error) {
            return rejectWithValue("Add User error");
        }
    },
);


const addUsersSlice = createSlice({
    name: "postUsers",
    initialState: {
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        // add
        builder.addCase(addUsersAction.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(addUsersAction.fulfilled, (state) => {
            state.isLoading = false;
        });

        builder.addCase(addUsersAction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action?.payload;
        });
    },
});

export default addUsersSlice.reducer;