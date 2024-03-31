import React, { useEffect, useState } from 'react';
import classes from './index.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [notifFailed, setNotifFailed] = useState(false);
    const [nickname, setNickname] = useState('');

    const [dataPokemon, setDataPokemon] = React.useState({});
    const [dataProbability, setDataProbability] = React.useState({});
    const [loading, isLoading] = React.useState(true);
    const [error, setError] = React.useState(false)

    useEffect(() => {
        document.title = 'Detail Page!'

        axios.get(`${process.env.REACT_APP_POKE_API}/pokemon/${id}`)
            .then((response) => {
                console.log(response.data);
                setDataPokemon(response.data)
            })
            .catch((err) => {
                console.log(err);
                setError(err.message)
            })
            .finally(() => {
                isLoading(false)
            })


        if (!dataProbability.catchStatus === "") {
            return null
        }
    }, [dataProbability, id]);

    const resetStatus = () => {
        setShow(false);
        setNotifFailed(false);
    };

    const probability = () => {
        resetStatus();
        axios.get(`${process.env.REACT_APP_BASE_API}/check-probability`)
            .then((response) => {
                console.log(response.data);
                setDataProbability(response.data)
            })
            .catch((err) => {
                console.log(err);
                setError(err.message)
            })
            .finally(() => {
                isLoading(false)
            })
    };

    useEffect(() => {
        if (dataProbability.catchStatus === 'Success') {
            setShow(true);
        } else if (dataProbability.catchStatus === 'Failed') {
            setNotifFailed(true);
        }
    }, [dataProbability]);

    useEffect(() => {
        if (notifFailed) {
            setTimeout(() => {
                setNotifFailed(false);
            }, 3000);
        };
    }, [notifFailed]);

    const catchHandler = async (e) => {
        e.preventDefault();
        const newPokemon = {
            pokemonid: dataPokemon.id,
            nickname: nickname,
            imageurl: `${process.env.REACT_APP_IMG_API}/${id + 1}.png`
        };

        console.log(newPokemon);

        await axios.post(`${process.env.REACT_APP_BASE_API}/catch-pokemon`, newPokemon)
        return navigate('/mypage')

    };

    return (
        <div className={classes.container}>
            {console.log(dataPokemon.name)}
            <div className={classes.wraper}>
                {notifFailed && <p className={classes.notifFailed}>Failed to Catch Pokemon</p>}
                {show &&
                    <div className={classes.form}>
                        <form onSubmit={catchHandler}>
                            <input type='text'
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}>
                            </input>
                            <button className={classes.btn} type='submit'>Submit</button>
                        </form>
                    </div>
                }
                {
                    loading ? (
                        <h2>Loading....</h2>
                    ) : error ? (
                        <div>Error</div>
                    ) :
                        (
                            <div className={classes.body}>
                                <div className={classes.card}>
                                    {/* <img src={dataPokemon?.imageUrl} alt={dataPokemon?.name} /> */}
                                    <img src={`${process.env.REACT_APP_IMG_API}/${id + 1}.png`} style={{ width: '500px', height: '500px' }} alt={JSON.stringify(dataPokemon.name)} />
                                    <p>{JSON.stringify(dataPokemon.name)}</p>
                                </div>
                                <div className={classes.rightSection}>
                                    <div className={classes.details}>
                                        <p>MOVES : {JSON.stringify(dataPokemon.moves)}</p>
                                        <p>TYPES : {JSON.stringify(dataPokemon.types)}</p>
                                        <p>ABILITIES : {JSON.stringify(dataPokemon.abilities)}</p>
                                    </div>
                                    <div className={classes.btnCatch} onClick={probability} >
                                        Catch Pokemon
                                    </div>
                                </div>
                            </div>
                        )
                    // (dataPokemon && dataPokemon?.map((item, index) => (
                    //     <div key={index} className={classes.body}>
                    //         <div className={classes.card}>
                    //             {/* <img src={dataPokemon?.imageUrl} alt={item?.name} /> */}
                    //             <p>{item?.name}</p>
                    //         </div>
                    //         <div className={classes.rightSection}>
                    //             <div className={classes.details}>
                    //                 <p>MOVES : {item?.moves}</p>
                    //                 <p>TYPES : {item?.types}</p>
                    //                 <p>ABILITIES : {item?.abilities}</p>
                    //             </div>
                    //             <div className={classes.btnCatch} onClick={probability} >
                    //                 Catch Pokemon
                    //             </div>
                    //         </div>
                    //     </div>
                    // ))
                    // )
                }
            </div>
        </div >
    );
};

export default Detail;