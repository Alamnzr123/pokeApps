import React from "react";
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import { deleteUsersAction } from '../redux/reducers/deleteUserReducer';
import { useSelector, useDispatch } from 'react-redux';

const Button = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [count, setCount] = React.useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    function handleClickMinus() {
        setCount(count - 1);
    }

    async function handleDelete(id) {
        dispatch(deleteUsersAction({ id }))
        window.location.reload();
    }

    // console.log(person.name, size);
    console.log(props.size);

    return (
        <React.Fragment>
            <h1>{count} {props.size}</h1>
            <button onClick={handleClick} className="btn btn-primary">Click Me Tambah!</button>
            <button onClick={handleClickMinus} className="btn btn-warning">Click Me Kurang!</button>
            <button onClick={() => handleDelete(props.item?.id)} className="btn btn-danger">Click Me Hapus!</button>
            <Link to={`/login/${props.item.id}`}>
                < button className="btn btn-dark">Click Me Update!</button>
            </Link>
        </React.Fragment >

    )
}

export default Button;


























// import React, { useState, useEffect } from 'react';

// const BtnOke = ({ person, size, harga }) => {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         console.log('ini mounted');
//     }, [])

//     useEffect(() => {
//         console.log("update tanpa depedensi")
//     }, [])

//     function handleClick() {
//         setCount(count + 1);
//     }

//     function handleDecrement() {
//         setCount(count - 1);
//     }

//     // internal CSS Using Variable
//     const style = {
//         backgroundColor: 'red',
//     }

//     return (
//         <>
//             {/* <button style={style}>OKE</button>

//             <h1>{harga}</h1>
//             <h1>{person.name} = {person.imageId}</h1>
//             <h1>{size}</h1> */}

//             <h1>{count}</h1>
//             <button onClick={handleDecrement}>
//                 Decrement
//             </button>
//             <br />
//             <button onClick={handleClick}>
//                 Increment
//             </button>
//         </>
//     )

// }

// export default BtnOke;


