import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    probability: null,
    status: 'idle',
    error: null
}

export const probabilityAction = createAsyncThunk('pokemon/probabilityAction', async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/check-probability`)
        return response.data
    } catch (error) {
        console.log(error.message);
    };
})

const probabilitySlice = createSlice({
    name: 'probability',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(probabilityAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(probabilityAction.fulfilled, (state, action) => {
                state.status = 'success';
                state.probability = action.payload;
            })
            .addCase(probabilityAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getProbability = (state) => state.probability;
export const getProbabilityPending = (state) => state.status;
export const getProbabilityError = (state) => state.error;

export default probabilitySlice.reducer;