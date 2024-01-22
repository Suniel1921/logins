import React, { useState } from 'react';
import '../signup/signup.css';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";



const Singup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  //show hide password
  const handleShowHidePassword = ()=>{
    setShowPassword(!showPassword);
  }

//form validation (client side)
 const validationSchema = Yup.object({
  name : Yup.string().required("Name is required"),
  email : Yup.string().email("Invaid Email").required("Email is required"),
  password : Yup.string().min(6, "Passwor must be atleast 6 character").required("Password is required")
 })

  const formik = useFormik({
    initialValues: {
      name : ''  ,
      email: '',
      password : '',
      },
      validationSchema: validationSchema,
      onSubmit : async (values)=>{
        try {
          const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/singup`,(values));
          if(response.data.success){
            toast.success(response.data.message);
            navigate('/');
            setTimeout(()=>{
              window.location.reload();
            },2000)
          }

          
        } catch (error) {
          if(error.response){
            toast.error(error.response.data.message);
          }
          else{
            toast.error("Something went wrong !");
          }
          
        }

      }
    
  })



  return (
    <>
        <div className='singup'>
        <h2 className='singupTextCenter'>Signup Here</h2>
        <form className='form' onSubmit={formik.handleSubmit}>
            <input onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} type="text" name="name" placeholder='Name'/>
            {formik.touched.name && formik.errors.name && <p className='errors'>{formik.errors.name}</p>}
            <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" name="email" placeholder='Email' />
            {formik.touched.email && formik.errors.email && <p className='errors'>{formik.errors.email}</p>}
            <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} type={showPassword ? 'text' : 'password'} name="password" placeholder='Password' />
            <i className='eyesIcon' onClick={handleShowHidePassword}>
            {showPassword ? <FaEyeSlash size={18}/>  : <FaRegEye size={18}/>}
            </i>           
         
            {formik.touched.password && formik.errors.password && <p className='errors'>{formik.errors.password}</p>}
            <button type='submit' className='btn'>Sign up</button>
        </form>
        </div>
    </>
  )
}

export default Singup