import axios from '../config/axios.config'


/**
 * Login Method
 * @param {string} email Email to login a user
 * @param {string} password Password to login a user
 * @returns 
 */
export const login = (email: string, password: string) => {
    //Declare body to POST
    let body = {
        email: email,
        password: password
    }

    //send POST request to login enpoint
    //http://localhost:8000/api/auth/login
    return axios.post('/auth/login',body)


}


/**
 * Method to register User
 * @param {string} name name of user
 * @param {string} email Email of User
 * @param {string} password Pässword of user
 * @param {number} age age of user
 * @returns 
 */
export const register = (name: string,email: string, password: string, age: number) => {
    //Declare body to POST
    let body = {
        name: name,
        email: email,
        password: password,
        age: age
    }

    //send POST request to login enpoint
    //http://localhost:8000/api/auth/register
    return axios.post('/auth/register',body)

    
}