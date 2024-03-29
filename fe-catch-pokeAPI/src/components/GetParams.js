// PARAMS
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'

const BtnOke = () => {
    const { id } = useParams();
    return (
        <>
            <h1>Ini Params {id}</h1>
            <Link className="btn btn-primary" to='/params'>KLIK ME</Link>
        </>
    )
}

export default BtnOke;