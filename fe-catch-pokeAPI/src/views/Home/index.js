import React, { useEffect } from 'react';
import axios from 'axios';
import classes from './index.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const [data, setData] = React.useState([]);
    const [loading, isLoading] = React.useState(true);
    const [error, setError] = React.useState(false)

    const toDetail = (pokeId) => {
        navigate(`detail/${pokeId}`);
    };

    useEffect(() => {
        document.title = 'Home Page!'

        axios.get(`${process.env.REACT_APP_POKE_API}/pokemon`)
            .then((response) => {
                console.log(response.data);
                setData(response.data)
                console.log(setData)
            })
            .catch((err) => {
                console.log(err);
                setError(err.message)
            })
            .finally(() => {
                isLoading(false)
            })
    }, [])


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
                            data && data.results.map((item, i) => (
                                <div key={i} className="card card-body" onClick={() => toDetail(item.url.split('/')[6])}>
                                    <li>{item.name}</li>
                                    <li>{item.url}</li>
                                    <img src={`${process.env.REACT_APP_IMG_API}/${i + 1}.png`} style={{ width: '500px', height: '500px' }} alt="gambar1" />
                                </div>
                            ))
                        )
                }
            </div>
        </React.Fragment >
    )
}

export default Home;