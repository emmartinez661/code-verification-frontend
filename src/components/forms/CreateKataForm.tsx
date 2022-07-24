import react from 'react'

import { Formik, Field, Form , ErrorMessage} from 'formik';
import * as Yup from 'yup';

import { useSessionStorage } from '../../hooks/useSessionStorage';
import { createKata } from '../../services/katasService';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IKata } from '../../utils/types/Kata.type';

const createKataSchema = Yup.object().shape(
    {
        name: Yup.string().required('Name of kata is required'),
        description: Yup.string().required('description of kata is required'),
        level: Yup.string().required('level of kata is required'),
        
    }
)

 const CreateKataForm = () =>{

    let loggedIn = useSessionStorage('sessionJWTToken');
    let navigate = useNavigate();

    //define the initial values
    const initialValuesForm={
        name: '',
        description: '',
        level:'',
        
    }

    return (
        <div>
            <h4>Create New Kata Form</h4>
            {/*Formik */}
            <Formik
            initialValues={initialValuesForm}
            validationSchema={createKataSchema}
            onSubmit= {async(values) => {
                let kataData :IKata = {
                    name: values.name,
                    description: values.description,
                    level: values.level
                }
                createKata(loggedIn, kataData).then((response: AxiosResponse) =>{ 
                    if(response.status === 200  ){
                        
                        alert(response.data)
                        alert('Kata created Successfully');
                        navigate('/katas')
                    }else{
                        throw new Error('Error Creating Kata')
                    }

                }).catch((error) => console.error(`[CREATE KATA ERROR]: Something went wrong: ${error}`))
            }}>
                {
                    ({values, touched, errors,handleChange, handleBlur, isSubmitting}) =>(
                        <Form>
                            {/* Name  kata Field */}
                            <label htmlFor='name'>Name</label>
                            <Field id='name' type='text' name='name' placeholder='Name'/>

                            {/* Name kata Errors */}
                            {
                                errors.name && touched.name && (
                                    <ErrorMessage name='name' component='div'></ErrorMessage>
                                )
                            }
                            {/* description kata Field */}
                            <label htmlFor='description'>Description</label>
                            <Field id='description' type='text' name='description' placeholder='Description of Kata'/>

                            {/* description kata  Errors */}
                            {
                                errors.description && touched.description && (
                                    <ErrorMessage name='description' component='div'></ErrorMessage>
                                )
                            }

                            {/* level Field */}
                            <label htmlFor="level">Level</label>
                            <select name="level" id="level"
                            value={values.level}
                            onChange={handleChange}
                            onBlur={handleBlur}>
                                <option value="" label='Select a Level'/>
                                <option value="Basic" label='Basic'/>
                                <option value="Medium" label='Medium'/>
                                <option value="High" label='High'/>
                            </select>
                            { /* Error on Select */}
                            {errors.level && touched.level && <div className='input-feedback'>{errors.level}</div>}

                            {/*Submit button to create new Kata */}
                            <button type='submit'>Create new Kata</button>
                            {/*Message if the form is submitting */}
                            {
                                isSubmitting ? (<p>Binding data registry...</p>) : null 
                            }

                        </Form>
                    )
                }

            </Formik>
        </div>
    )
}

export default CreateKataForm