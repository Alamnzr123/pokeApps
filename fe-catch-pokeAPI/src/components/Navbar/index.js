import React from 'react';
import classes from './index.module.css';
import pokemon from '../../assets/pokemon.png';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <div className={classes.wraper}>
                <img src={pokemon} alt='pokemon' onClick={() => navigate('/')} />
                <div className={classes.navbar}>
                    <p onClick={() => navigate('/')}>Dashboard</p>
                    <p onClick={() => navigate('/mypage')}>My Pokemon</p>
                </div>
            </div>
        </div>
    );
};