import { AxiosResponse } from 'axios';
import react, {useEffect, useState} from 'react'

import * as Yup from 'yup';

//react router DOM imports
import {useNavigate, useParams} from 'react-router-dom'
import { Editor } from '../components/editor/Editor';
//import EditKataForm from '../components/forms/EditKataForm';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getKataByID, updateKata, deleteKata } from '../services/katasService';
import { Kata, UsersVote } from '../utils/types/Kata.type';
import { ErrorMessage, Field, Form, Formik } from 'formik';


export const KatasDetailPage = () =>{
    
    let loggedIn = useSessionStorage('sessionJWTToken');
    let navigate = useNavigate();
    let userID: string = sessionStorage?.getItem('sessionUserID') || ' '
    let {id} = useParams();
    
    
    //variable to navigate between stack of routes
    
    const [kata, setKata] = useState<Kata | undefined>(undefined);
    const [showSolution, setShowSolution] = useState(true);
    const [showEdit, setShowEdit] = useState(true);
    const [showDeleteKata, setShowDeleteKata]= useState(true);
    
    
    
    //define the initial credentials
    const EditKataSchema = Yup.object().shape(
        {
            name: Yup.string().required('Name of Kata is required'),
            description : Yup.string().required('Description of Kata is required'),
            level: Yup.string().required('Level of this kata is Required')
        }
        );
        
        const initialCredentials = {        
            name: kata?.name,
            description: kata?.description,
            level: kata?.level,
            //intents: kata?.intents,
            //stars: kata?.stars,
           solution: {
            solution: kata?.solution.solution,
            
           }
            }
            
const [form, setForm ]= useState(initialCredentials);

  
    useEffect(() => {
        if(!loggedIn){
            return navigate('/login')
        }else{
            if(id){
                getKataByID(loggedIn, id).then((response: AxiosResponse) =>{
                    if(response.status === 200 && response.data){                        
                        let KataData:Kata= {
                            _id:response.data._id,
                            name:response.data.name,
                            description:response.data.description,
                            level:response.data.level,
                            intents:response.data.intents,
                            stars:response.data.stars,
                            creator:response.data.creator,
                            solution: {
                                solution: response.data.solution.solution,
                                uSolutions: response.data.solution.uSolutions
                            },
                            participants: {
                                uv: response.data.participants.uv
                            
                            }                            
                        }
                        //pass the KataData to Kata
                        //-------------------------
                        setKata(KataData)                        
                        
                        //take the userID from the jwtToken and verify if is the same of the Kata creator to can edit & Delete
                        //-----------------------------------------------------------------------------------------------------
                        let userID: string = sessionStorage?.getItem('sessionUserID') || ' '
                        if(KataData.creator === userID){
                            setShowEdit(!showEdit)
                            setShowDeleteKata(!showDeleteKata)
                            //pendiente de analizar si actualiza 
                            
                        }   
                    }
                }).catch((error) => console.error(`[Kata By ID ERROR]: ${error}`))
                
            }else{
                return navigate('/katas');
            }
        }
    }, [loggedIn])

//Function to Delete Kata
//-------------------------
const deleteKataByID = () =>{
    deleteKata(userID,id!,loggedIn).then((response: AxiosResponse) => {
        alert('Kata Deleted Successfully!')
        return navigate('/katas')
    })
}
  

    return (
        <div>
            <h1>Kata Detail Page: {id}</h1>
            { 
                    //is kata true? 
             kata ?
              
            <div  className='kata-data' >

                {/* validation to show button to delete Kata
                    -----------------------------------------
                 */}
                 {!showDeleteKata ? <button onClick={() =>deleteKataByID()}>Delete Kata</button>: null} 

                 {/* Validation to show button to edit Kata */}
                { showEdit ?  <button onClick={() =>setShowEdit(!showEdit)}>Cancel Edit</button> : null}                    
                 { !showEdit? <button onClick={ () =>setShowEdit(!showEdit)}>Edit Kata</button>: null}

                 {/* showing data kata in details */}
                <h1>{kata?.name}</h1> 
                <h2>{kata?.description}</h2>
                <h3>Rating :{kata.stars}/5</h3>
                <p>creator of kata:{kata?.creator}</p>

                {/* showing the participants of the kata
                
                Participants have a model of UsersVote
                --------------------------------------
                 participants: {
                    uv: UsersVote[]
                 }

                 How is data inside UsersVote 
                 -----------------------------
                 UsersVote ={
                    user_id: string,
                    stars: number
                }
                
                */}
                <p>Participants</p>
                { kata.participants.uv.length ? 
                    <div>                        
                        {kata.participants.uv.map((userVote: UsersVote) =>(
                            <div >
                            <li key={userVote.user_id}>id:{userVote.user_id}</li>
                            <li key={userVote.stars}>voto: <p>{userVote.stars}</p></li>
                            </div>
                            ))
                        }
                    </div>
                    :
                    <div>nobody had participants in this kata</div>
                } 

                {/* Validate if show the solution of the kata
                    -----------------------------------------
                */}
                 <button onClick={() => setShowSolution(!showSolution)}>
                    {!showSolution?  'Hide solution':'Show solution'   }
                </button> 
               
                {showSolution ? null:   <Editor>{kata?.solution.solution}</Editor>  }
            </div>
            :
            <div>
                <h2>Loading data....</h2>
            </div>

}
{/**validate to show the Form to Update the data Kata
 * ------------------------------------------------
*/}
{!showEdit ? 
        null:
    <Formik
    initialValues= {initialCredentials}
    validationSchema= {EditKataSchema}
    onSubmit= { async(values) =>{     
        let userID: string = sessionStorage?.getItem('sessionUserID') || ' '
         await updateKata(id!,values, userID,loggedIn ).then((response: AxiosResponse) => {
           
            if(response.status === 200) {         
                
                setKata(response.data.kata)
                setShowEdit(!showEdit)
                window.location.reload()
                alert('Kata update Successfully')
            }else {
                throw new Error('Error Updating Kata')
            }
        }).catch((error) => console.error(`[UPDATE KATA ERROR]: Something went wrong ${error}`))
        
        
    }}
    >
        {
        ({values, touched, errors, handleChange, handleBlur, isSubmitting}) => (
            <Form>
                {/* name kata Field */}
                <label htmlFor='name'>Name</label>
                            <Field id='name' type='text' name='name' placeholder={form.name}/>
                {/* Name kata Errors */}
                {errors.name && touched.name && 
                (
                <ErrorMessage name='name' component='div'></ErrorMessage>
                )
                } 
                {/* description kata Field */}
                <label htmlFor='description'>Description</label>
                <Field id='description' type='text' name='description' placeholder={form.description}/>

                {/* description kata  Errors */}
                {errors.description && touched.description && 
                (
                <ErrorMessage name='description' component='div'></ErrorMessage>
                )
                }    
                {/* level Field */}
                <label htmlFor="level">Level</label>
                <select name="level" id="level"
                        value={values.level}
                        onChange={handleChange}
                        onBlur={handleBlur}>
                                <option value="" label={form.level}/>
                                <option value="Basic" label='Basic'/>
                                <option value="Medium" label='Medium'/>
                                <option value="High" label='High'/>
                </select>
                { /* Error on Select */}
                {errors.level && touched.level && <div className='input-feedback'>{errors.level}</div>}

                {/*Submit button to create new Kata */}
                <button type='submit'>Update Kata</button>
                
                {/*Message if the form is submitting */}
                {
                isSubmitting ? (<p>Binding data registry...</p>) : null 
                }      
            </Form>
        )
        }
        </Formik>
    
  
            }
            
        </div>

    

    )
}