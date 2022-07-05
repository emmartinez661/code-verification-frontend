import React, { useEffect } from 'react'

// React Router Dom imports
import {useNavigate, useParams } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionstorage';

export const KatasDetailPage= () =>{
    
    //Find id from params 
    let {id} = useParams();
    //variable to navigate between stack of routes
    let navigate = useNavigate();

    let loggedIn = useSessionStorage('sessionJWTToken');
    

    useEffect(() => {
        if(!loggedIn){
            return navigate('/login');
        }
       
    }, [loggedIn])

    return (
        <div>
            <h1>Kata Detail Page:{id}</h1>
        </div>
    )
}