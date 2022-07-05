import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useSessionStorage } from '../hooks/useSessionstorage';

export const KatasPage = () =>{

    let loggedIn = useSessionStorage('sessionJWTToken');
    let navigate = useNavigate();

    useEffect(() => {
        if(!loggedIn){
            return navigate('/login');
        }
       
    }, [loggedIn])

    /**
     * Methos to navigate to kata details
     * @param id of kata to navigate to 
     */
    const navigateToKataDetail =(id: number) =>{
        navigate(`/katas/${id}`);
    }
    
    return (
        <div>
            <h1>Katas Page</h1>
            {/* TODO real katas */}
            <ul>
                {/* TODO Export to isolated component */}
                <li onClick={ () => navigateToKataDetail(1)}>First Kata</li>
                <li onClick={ () => navigateToKataDetail(2)}>Second Kata</li>
            </ul>
        </div>
    )
}