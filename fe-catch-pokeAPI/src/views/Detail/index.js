// import React, { useEffect, useState } from 'react';
// import classes from './index.module.css';
// import { Navbar } from '../../components/Navbar';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import {
//     caughtPokemon, caughtPokemonAction, caughtPokemonError, caughtPokemonStatus
//     , checkIsPrimeAction, getPokemons, getPokemonsAction, removePokemonAction,
//     removePokemons, renameMonsterAction, renamePokemons
// } from '../../redux/reducers/myPokemons/index';

// import {
//     getPokemonDetailAction, selectAllPokemonsDetail,
//     selectAllPokemonsDetailError, selectAllPokemonsDetailStatus
// } from '../../redux/reducers/pokemon/getAllPokemonDetail';

// import {
//     getProbability, getProbabilityError, getProbabilityPending, probabilityAction
// } from '../../redux/reducers/condition/index'

// const Detail = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const pokemon = useSelector(selectAllPokemonsDetail)
//     console.log(pokemon);
//     const probabilityValue = useSelector(getProbability);
//     const { id } = useParams();
//     const [show, setShow] = useState(false);
//     const [notifFailed, setNotifFailed] = useState(false);
//     const [nickname, setNickname] = useState('');

//     useEffect(() => {
//         dispatch(getPokemonDetailAction({ id }));

//         if (!probabilityAction(probabilityValue)) {
//             dispatch(getProbabilityError)
//         }
//     }, []);

//     const resetStatus = () => {
//         setShow(false);
//         setNotifFailed(false);
//     };

//     const probability = () => {
//         resetStatus();
//         dispatch(getProbabilityPending);
//     };

//     useEffect(() => {
//         if (probabilityValue === 'success') {
//             setShow(true);
//         } else if (probabilityValue === 'failed') {
//             setNotifFailed(true);
//         }
//     }, [probabilityValue]);

//     useEffect(() => {
//         if (notifFailed) {
//             setTimeout(() => {
//                 setNotifFailed(false);
//             }, 3000);
//         };
//     }, [notifFailed]);

//     const catchHandler = (e) => {
//         e.preventDefault();
//         const newPokemon = {
//             pokemonId: pokemon.id,
//             nickname: nickname,
//             imageUrl: pokemon.imageUrl
//         };
//         dispatch(caughtPokemon(newPokemon,
//             () => { navigate('/mypage') }
//         ));
//     };

//     return (
//         <div className={classes.container}>
//             <Navbar />
//             <div className={classes.wraper}>
//                 {notifFailed && <p className={classes.notifFailed}>Failed to Catch Pokemon</p>}
//                 {show &&
//                     <div className={classes.form}>
//                         <form onSubmit={catchHandler}>
//                             <input type='text'
//                                 value={nickname}
//                                 onChange={(e) => setNickname(e.target.value)}>
//                             </input>
//                             <button className={classes.btn} type='submit'>Submit</button>
//                         </form>
//                     </div>
//                 }
//                 <div className={classes.body}>
//                     <div className={classes.card}>
//                         <img src={pokemon?.imageUrl} alt={pokemon?.name} />
//                         <p>{pokemon?.name}</p>
//                     </div>
//                     <div className={classes.rightSection}>
//                         <div className={classes.details}>
//                             <p>MOVES : {pokemon?.moves}</p>
//                             <p>TYPES : {pokemon?.types}</p>
//                             <p>ABILITIES : {pokemon?.abilities}</p>
//                         </div>
//                         <div className={classes.btnCatch} onClick={probability} >
//                             Catch Pokemon
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Detail;


import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './index.module.css';
import { Navbar } from '../../components/Navbar/index';
import { Card } from '../../components/Card/index';
import {
    getPokemonDetailAction, selectAllPokemonsDetail, selectAllPokemonsDetailError, selectAllPokemonsDetailStatus
} from '../../redux/reducers/pokemon/getAllPokemonDetail';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const pokemon = useDispatch(selectAllPokemonsDetail)
    console.log(pokemon);
    const pokemonStatus = useDispatch(selectAllPokemonsDetailStatus)
    const [data, setData] = React.useState([]);
    const [loading, isLoading] = React.useState(true);
    const [error, setError] = React.useState(false)

    const toDetail = (pokeomnId) => {
        navigate(`pokemon/${pokeomnId}`);
    };

    useEffect(() => {
        if (pokemonStatus === 'idle') {
            dispatch(getPokemonDetailAction({ id }));
        }
    }, [pokemonStatus, id, dispatch]);

    return (
        <React.Fragment>
            <div className={classes.body}>
                <h1>Pokemon Page</h1>
                {
                    loading ? (
                        <h2>Loading....</h2>
                    ) : error ? (
                        <div>Error</div>
                    ) :
                        (
                            pokemon && pokemon.map((item, i) => (
                                <div key={i} className="card card-body">
                                    <li>{item.name}</li>
                                    <li>{item.moves}</li>
                                    <img src={`${process.env.REACT_APP_IMG_API}/${i + 1}.png`} style={{ width: '500px', height: '500px' }} alt="gambar1" />
                                    <div className={classes.btnWraper}>
                                        <div className={classes.btnRename}>Rename</div>
                                        <div className={classes.btnRelease}>Release</div>
                                    </div>
                                </div>
                            ))
                        )
                }
            </div>
        </React.Fragment >
    )
}

export default Home;