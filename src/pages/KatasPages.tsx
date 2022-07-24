import { AxiosResponse } from 'axios';
import react, {useEffect,useState} from 'react'

import { useNavigate } from 'react-router-dom'
import CreateKataForm from '../components/forms/CreateKataForm';


import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllKatas } from '../services/katasService';
import { Kata } from '../utils/types/Kata.type';



export const KatasPage = () =>{

    let loggedIn = useSessionStorage('sessionJWTToken');
    let navigate = useNavigate();

    const [katas,setKatas] = useState([]);
    const [totalPages, setTotalPages]= useState(1);
    const [currentPage, setCurrentPage]= useState(1);
    const [showFormToCreateNewKata, setShowFormToCreateNewKata] = useState(false)

    useEffect(()=>{
        if(!loggedIn){
            return navigate('/login')
        }else {
            getAllKatas(loggedIn, 20,1).then((response: AxiosResponse) =>{
                if(response.status === 200 && response.data.katas && response.data.totalPages && response.data.currentPage) {
                    setKatas(response.data.katas)
                    setTotalPages(response.data.totalPages)
                    setCurrentPage(response.data.currentPage)
                    
                }else {
                    throw new Error (`Error obtaining katas: ${response.data}`)
                }
            }).catch((error) => console.error(`[GET ALL KATAS ERROR]: ${error}`))
        }
    },[loggedIn])


    /**
     * Method to navigate to kata detail
     * @param id of kata to navigate to
     */
    const navigateToKataDetail = (id: number) => {
        navigate(`/katas/${id}`);
    }  
    
    return(
        
        <div>
            <h2>DO YOU WANT TO CREATE NEW KATA, AND CHALLENGE YOUR FRIENDS?</h2>
            <button onClick={() => setShowFormToCreateNewKata(!showFormToCreateNewKata)}>
                {showFormToCreateNewKata ? 'Show Form' : 'Hide Form'}
            </button>
            {showFormToCreateNewKata ? null : <CreateKataForm/>}
                    
            <h1>Katas Page</h1>
            {katas.length >= 0 ?
            <div>
                {katas.map((kata: Kata) =>(
                    <li>
                        <div key={kata._id}>
                            <h3 onClick={() => navigateToKataDetail(kata._id)}>{kata.name}</h3>
                            <h4>{kata.description}</h4>
                            <h3>Creator: {kata.creator}</h3>
                            <p>Rating: {kata.stars}/5</p>
                        </div>
                    </li>
                    )
                )}
            </div>
            :
            <div>
                no katas found
            </div>
            }
        </div>
        
    )

}