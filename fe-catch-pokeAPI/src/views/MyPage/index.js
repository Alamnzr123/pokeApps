import React, { useEffect, useState } from "react";
import axios from 'axios';
import classes from './index.module.css';
import { isPrimeNumber } from '../../utils/primeNumber';

const MyPage = () => {
    const [data, setData] = React.useState([]);
    const [loading, isLoading] = React.useState(true);
    const [error, setError] = React.useState(false)

    const [selected, setSelected] = useState(null);
    const [notifFailed, setNotifFailed] = useState(false);
    const [notifSuccess, setNotifSuccess] = useState(false);

    useEffect(() => {
        document.title = 'My Page!'

        axios.get(`${process.env.REACT_APP_BASE_API}/mypokemons`)
            .then((response) => {
                setData(response.data.rows)
            })
            .catch((err) => {
                console.log(err);
                setError(err.message)
            })
            .finally(() => {
                isLoading(false)
            })
    }, []);

    const resetStatus = () => {
        setNotifFailed(false);
        setNotifSuccess(false);
    };

    const handleUpdate = async (e) => {
        console.log(data[0].id);
        e.preventDefault();
        resetStatus();
        if (selected.nickname.length > 0) {
            await axios.patch(`${process.env.REACT_APP_BASE_API}/rename-pokemon/${data[0].id}`, selected,
                () => { setSelected(null) })

            axios.get(`${process.env.REACT_APP_BASE_API}/mypokemons`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data.rows);
                })
        };
    };

    const removePokemon = async (id) => {
        if (notifFailed) {
            resetStatus();
        }

        const response = await axios.get(`${process.env.REACT_APP_BASE_API}/check-number`);
        if (isPrimeNumber(response.data.number)) {
            const result = await axios.delete(`${process.env.REACT_APP_BASE_API}/release-pokemon/${id}`);
            console.log(result);
            console.log("Data delete Successfully");
            window.location.reload();
        } else {
            console.log("Data Not Delete");
            setNotifFailed(true)
        }
        return response.data
    };

    useEffect(() => {
        if (notifFailed) {
            setTimeout(() => {
                setNotifFailed(false);
            }, 2000);
        }
    }, [notifFailed]);

    return (
        <div className={classes.container}>
            <div className={classes.wraper}>
                {notifFailed && <p className={classes.popup}>Failed to Release</p>}
                {notifSuccess && <p className={classes.popup}>Pokemon Renamed</p>}
                {selected && (
                    <div className={classes.form}>
                        <form onSubmit={handleUpdate}>
                            <input type='text'
                                onChange={(e) => setSelected({
                                    ...selected, nickname: e.target.value,
                                })}
                            ></input>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                )}
                <div className={classes.body}>
                    {
                        loading ? (
                            <h2>Loading....</h2>
                        ) : error ? (
                            <div>Error</div>
                        ) :
                            (
                                data && data.map((item, i) => (
                                    <div key={i} className="card card-body">
                                        <li>Pokemon Nickname : {item.nickname}</li>
                                        <li>Pokemon ID :{item.pokemonid}</li>
                                        <li>Pokemon Rename Count :{item.renamecount}</li>
                                        <img src={item.imageurl} style={{ width: '500px', height: '500px' }} alt={item.name} />

                                        <div className={classes.btnWraper}>
                                            <div className={classes.btnRename} onClick={() => setSelected(item)}>Rename</div>
                                            <div className={classes.btnRelease} onClick={() => removePokemon(item.id)}>Release</div>
                                        </div>
                                    </div>
                                ))
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default MyPage;