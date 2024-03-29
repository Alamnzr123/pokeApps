import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: {},
    status: 'idle',
    error: null
}

export const getAllPokemonsAction = createAsyncThunk('pokemons/getAllPokemonsAction', async () => {
    // const response = await axios.get(`${process.env.REACT_APP_BASE_API}/user`);
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    console.log(response.data.results[0]);

    // if (response.data.results[0]) {
    //     let characters = [];
    //     response.data.map((pokemon, i) => {
    //         return characters.push({
    //             name: pokemon.name,
    //             url: pokemon.url,
    //             imageUrl: `${process.env.REACT_APP_IMG_API}/${i + 1}.png`,
    //         });
    //     })
    //     return characters
    // }
    return response.data.results[0]
})

const getPokemonSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPokemonsAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllPokemonsAction.fulfilled, (state, action) => {
                state.status = 'success';
                // state.pokemons = state.pokemons.concat(action.payload);
                state.users = action.payload;
            })
            .addCase(getAllPokemonsAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const selectAllPokemons = (state) => state.users.users;
export const selectAllPokemonsStatus = (state) => state.users.status;
export const selectAllPokemonsError = (state) => state.users.error;

export default getPokemonSlice.reducer;