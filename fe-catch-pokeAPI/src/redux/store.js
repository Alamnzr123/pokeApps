import { configureStore } from '@reduxjs/toolkit'
import conditionReducer from './reducers/condition';
import myPokemons from './reducers/myPokemons';
import getAllPokemons from './reducers/pokemon/getAllPokemonReducer';
import getAllPokemonsDetail from './reducers/pokemon/getAllPokemonDetail';
import datauserReducer from './reducers/datauserReducer';

export const store = configureStore({
    reducer: {
        condition: conditionReducer,
        Pokemons: myPokemons,
        AllPokemons: getAllPokemons,
        DetailPokemons: getAllPokemonsDetail,
    }
});