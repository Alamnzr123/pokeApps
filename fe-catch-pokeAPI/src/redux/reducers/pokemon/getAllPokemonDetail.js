import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPokemonDetailAction = createAsyncThunk('pokemon/caughtPokemon', async ({ id }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_POKE_API}/pokemon/${id}`);
        console.log(response);
        return response.data

        // if (!response.data) {
        //     response = {
        //         ...response,
        //         id: Number(id.id),
        //         name: response.name,
        //         imageUrl: `${process.env.REACT_APP_IMG_API}/${id.id}.png`,
        //         moves: response.moves.map((item) => item.move.name).slice(0, 4).join(', '),
        //         types: response.types.map((item) => item.type.name).join(', '),
        //         abilities: response.abilities.map((item) => item.ability.name).join(', '),
        //     }
    } catch (error) {
        return rejectWithValue("Get Detail Pokemon Error");
    };
})


const getPokemonDetailSlice = createSlice({
    name: 'value',
    initialState: {
        poke: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPokemonDetailAction.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getPokemonDetailAction.fulfilled, (state, action) => {
                state.status = 'success';
                state.poke = action.payload
            })
            .addCase(getPokemonDetailAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const selectAllPokemonsDetail = (state) => state.value.poke;
export const selectAllPokemonsDetailStatus = (state) => state.value.status;
export const selectAllPokemonsDetailError = (state) => state.value.error;

export default getPokemonDetailSlice.reducer;