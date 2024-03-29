import React, { useEffect } from 'react';
import axios from 'axios';
import classes from './index.module.css';
import { Navbar } from '../../components/Navbar/index';
import { Card } from '../../components/Card/index';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const [data, setData] = React.useState([]);
    const [loading, isLoading] = React.useState(true);
    const [error, setError] = React.useState(false)

    const toDetail = (pokeomnId) => {
        navigate(`pokemon/${pokeomnId}`);
    };

    useEffect(() => {
        document.title = 'Halaman utama ni bos!'

        axios.get("https://pokeapi.co/api/v2/pokemon/")
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
            {console.log(data)}
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
                                <div key={i} className="card card-body">
                                    <li>{item.name}</li>
                                    <li>{item.url}</li>
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



// import React from 'react'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers, getUserError, getUsersStatus, selectAllUsers } from '../../redux/reducers/datauserReducer';

// const Home = () => {
//     const dispatch = useDispatch();

//     const userStatus = useSelector(getUsersStatus);
//     const AllUsers = useSelector(selectAllUsers);
//     console.log(AllUsers);
//     const error = useSelector(getUserError);

//     React.useEffect(() => {
//         if (userStatus === 'idle') {
//             dispatch(fetchUsers());
//         }
//     }, [userStatus, dispatch]);

//     let contentToDisplay = '';
//     if (userStatus === 'loading') {
//         contentToDisplay = <h2>Loading</h2>;
//     } else if (userStatus === 'success') {
//         contentToDisplay = AllUsers.map((data) => (
//             <div key={data.id}>
//                 <h2>{data.name}</h2>
//                 <p>{data.username}</p>
//                 <hr />
//             </div>
//         ))
//     } else if (userStatus === 'failed') {
//         contentToDisplay = <p>{error}</p>;
//     }

//     return (
//         <React.Fragment>
//             <div>
//                 <h1>User Page</h1>
//                 {contentToDisplay}
//             </div>
//         </React.Fragment>
//     )
// }

// export default Home