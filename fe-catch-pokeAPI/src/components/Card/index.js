import React from 'react';
import classes from './index.module.css';
import { useLocation } from "react-router-dom";

export const Card = ({ pokemon, toDetail, favourite, setSelected, removePokemon }) => {
    const location = useLocation();

    return (
        <div className={classes.container}>
            <div className={classes.wraper}>
                {location.pathname === '/' ? (
                    <div className={classes.card} onClick={() => toDetail(pokemon.url.split('/')[6])}>
                        <img src={pokemon.imageUrl} alt='pokemon' />
                        <p>
                            {!favourite ? pokemon.name : pokemon.nickname}
                        </p>
                    </div>
                ) : (
                    <div className={classes.card}>
                        <img src={pokemon.imageUrl} alt='pokemon' />
                        <p>
                            {!favourite ? pokemon.name : pokemon.nickname}
                        </p>
                        <div className={classes.btnWraper}>
                            <div className={classes.btnRename} onClick={() => setSelected(pokemon)}>Rename</div>
                            <div className={classes.btnRelease} onClick={() => removePokemon(pokemon.id)}>Release</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};