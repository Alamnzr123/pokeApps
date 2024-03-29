import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { isPrimeNumber } from '../../../utils/primeNumber';

const initialState = {
    myPokemons: [],
    renamePokemon: {},
    status: 'idle',
    error: null
}

export const caughtPokemonAction = createAsyncThunk('pokemon/caughtPokemon', async ({ payload }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_API}/catch-pokemon`, payload);
        return response.data
    } catch (error) {
        console.log(error);
    };
})

export const getPokemonsAction = createAsyncThunk('pokemon/getPokemon', async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/my-pokemons`)
        return response.data
    } catch (error) {
        console.log(error);
    };
})

export const renameMonsterAction = createAsyncThunk('pokemon/renamePokemon', async ({ id, data }) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_BASE_API}/rename-pokemon/${id}`, data)
        return response.data
    } catch (error) {
        console.log(error);
    };
})

export const checkIsPrimeAction = createAsyncThunk('pokemon/chekIsPrime', async ({ cb, cbFailed }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/check-number`);

        if (isPrimeNumber(response.number)) {
            cb && cb();
        } else {
            cbFailed && cbFailed();
        }
        return response.data
    } catch (error) {
        console.log(error);
    };
})

export const removePokemonAction = createAsyncThunk('pokemon/removePokemon', async ({ id, cb }) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_API}/release-pokemon/${id}`);
        return response.data
    } catch (error) {
        console.log(error);
    }
})

const myPokemonsSlice = createSlice({
    name: 'myPokemons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(caughtPokemonAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(caughtPokemonAction.fulfilled, (state, action) => {
                state.status = 'success';
                state.myPokemons = action.payload;
            })
            .addCase(caughtPokemonAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getPokemonsAction.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload;
            })
            .addCase(renameMonsterAction.fulfilled, (state, action) => {
                state.status = 'success';
                let filter = state.myPokemons.filter(item => item.id !== action.response.id);
                filter = filter.concat(action.response);
                filter.sort((a, b) => (a.id > b.id) ? 1 : -1);
                state.myPokemons = filter;
            })
            .addCase(removePokemonAction.fulfilled, (state, action) => {
                state.status = 'success';
                state.myPokemons.filter(item => item.id !== action.id);
            });
    },
});

export const caughtPokemon = (state) => state.myPokemons.myPokemons;
export const caughtPokemonStatus = (state) => state.myPokemons.status;
export const caughtPokemonError = (state) => state.myPokemons.error;

export const getPokemons = (state) => state.myPokemons.myPokemons;
export const renamePokemons = (state) => state.myPokemons.myPokemons;
export const removePokemons = (state) => state.myPokemons.myPokemons;


export default myPokemonsSlice.reducer;
