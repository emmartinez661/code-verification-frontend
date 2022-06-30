import react from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { login } from '../../services/authServices';
import { AxiosResponse } from 'axios';


//Define Schema of validation with Yup
const loginSchema = Yup.object().shape(
    {
        email: Yup.string().email('Invalid Email formad').required('Email is required'),
        password: Yup.string().required('Password is required')
    }
);

//Login Component
const LoginForm = () => {

    //define the initial credentials
    const initialCredentials = {
        email: '',
        password: ''
    }

    return (
        <div>
            <h4>Login form</h4>
            {/*Formik to create a form */}
            <Formik
                initialValues={initialCredentials}
                validationSchema = {loginSchema}
                onSubmit={ async(values) =>{
                    login(values.email, values.password).then((response:AxiosResponse) => {
                        if(response.status == 200){
                            if(response.data.token){
                                alert(JSON.stringify(response.data, null,2))
                                sessionStorage.setItem('sessionJWTToken', response.data.token)
                            }else {
                                throw new Error('Error generating token')
                            }
                            
                        }else {
                            throw new Error('Invalid Credentials ')
                        }

                    }).catch((error) => console.error(`[LOGIN ERROR]: Something went wrong: ${error}`))
                }}
            >
                {
                ({values, touched, errors, handleChange, handleBlur,isSubmitting}) => 
                    (
                        <Form>
                            {/* Email Field */}
                            <label htmlFor='email'>Email</label>
                            <Field id='email' type='email' name='email' placeholder='example@email.com'/>

                            {/* Email Errors */}
                            {
                                errors.email && touched.email && (
                                    <ErrorMessage name='email' component='div'></ErrorMessage>
                                )
                            }
                            {/* Password Field */}
                            <label htmlFor='password'>Password</label>
                            <Field id='password' type='password' name='password' placeholder=''/>

                            {/* Password Errors */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div'></ErrorMessage>
                                )
                            }

                            {/*Submit button Form */}
                            <button type='submit'>Login</button>

                            {/*Message if the form is submitting */}
                            {
                                isSubmitting ? (<p>Checking credentials...</p>) : null 
                            }
                        </Form>
                    )                    
                } 
            </Formik>
        </div>
    )
}

export default LoginForm;