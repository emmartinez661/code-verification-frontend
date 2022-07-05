import react from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import { register } from '../../services/authServices';
import { AxiosResponse } from 'axios';

const RegisterForm = () =>{
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirm:'',
        age: 18
    }

    //Yup validation Schema
    const registerSchema = Yup.object().shape(
        {
            name: Yup.string().min(6, 'Username most have 6 letter minimun').max(12,'Username must have maximum 12 letters').required('Username is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().min(8,'Password to short').required('Password is required'),
            confirm: Yup.string().when("password",{
                is: (value:string) => (value && value.length >0? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],'Password must match'
                )
            }).required('you must confirm your password'),
            age: Yup.number().min(18, 'You must be over 18 years old').required('age is required')
        }
    );

    return (
        <div>
            <h4>Register Form</h4>
            {/*Formik */}
            <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={ async(values) =>{
                register(values.name,values.email,values.password,values.age).then((response: AxiosResponse) => {
                    if(response.status === 200){
                        console.log(response.data)
                        alert(response.data)
                    }else{
                        throw new Error('Error in registring')
                    }
                }).catch((error) => console.error(`[REGISTER ERROR]: Something went wrong: ${error}`))
            }}
            >
                  {
                ({values, touched, errors, handleChange, handleBlur,isSubmitting}) => 
                    (
                        <Form>
                             {/* Name Field */}
                             <label htmlFor='name'>Name</label>
                            <Field id='name' type='text' name='name' placeholder='Name'/>

                            {/* Name Errors */}
                            {
                                errors.name && touched.name && (
                                    <ErrorMessage name='name' component='div'></ErrorMessage>
                                )
                            }
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
                            <Field id='password' type='password' name='password' placeholder='Password'/>

                            {/* Password Errors */}
                            {
                                errors.password && touched.password && (
                                    <ErrorMessage name='password' component='div'></ErrorMessage>
                                )
                            }

                            {/*confirm Field */}
                            <label htmlFor='confirm'>confirm Password</label>
                            <Field id='confirm' type='password' name='confirm' placeholder='Confirm your Password'/>

                            {/* Password Errors */}
                            {
                                errors.confirm && touched.confirm && (
                                    <ErrorMessage name='confirm' component='div'></ErrorMessage>
                                )
                            }

                             {/*age Field */}
                             <label htmlFor='age'>Age</label>
                            <Field id='age' type='number' name='age' placeholder='Age'/>

                            {/* Age Errors */}
                            {
                                errors.age && touched.age && (
                                    <ErrorMessage name='age' component='div'></ErrorMessage>
                                )
                            }

                            {/*Submit button Form */}
                            <button type='submit'>Register</button>

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

export default RegisterForm