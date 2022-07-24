import { AxiosRequestConfig } from 'axios';
import axios from '../utils/config/axios.config'
import { IKata, Kata } from '../utils/types/Kata.type';

//Declare body to Get
export const getAllKatas = (token: string, limit?: number, page?:number) =>{

    const opt: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            limit:limit,
            page:page
        }
    }

     return axios.get('/katas',opt)
    
}

export const getKataByID = (token: string, id: string) => {
    const opt: AxiosRequestConfig = {
        headers: {
        'x-access-token': token
        },
        params: {
            id: id
        }
    }
    return axios.get('/katas',opt)
}

export const createKata = (token: string, kata: IKata) => {
    const opt :AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        
    }
    const body = { 
        name: kata.name,
        description: kata.description,
        level: kata.level
    }

    return axios.post('/katas',body,opt)
}

export const updateKata = (id: string, kata: any,userID: string,token: string  ) => {
    const opt : AxiosRequestConfig = {
        headers : {
            'x-access-token': token
        },
        params: {
            userID: userID,
            id : id
        }

    }
   /*  const body = {
        name: kata.name,
        description: kata.description,
        level: kata.level,
        solution: {
            solution: kata.solution.solution
        }
    } */
   

    return axios.put('/katas',kata,opt)
}


export const deleteKata = ( userID: string, id: string, token: string) =>{
    const opt : AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            userID: userID,
            id: id
        }
    }
    return axios.delete('/katas',opt)
}