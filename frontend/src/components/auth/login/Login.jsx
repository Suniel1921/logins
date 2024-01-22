import React from "react";
import "../login/login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthGloabally } from "../../../context/AuthContext";

const Login = () => {
  const [auth, setAuth] = useAuthGloabally();
  //form validation
  const validationSchema = Yup.object({
    email : Yup.string().email("Invalid Email").required("Email is required"),
    password : Yup.string().required("Password is required"),
  })
 
  const formik = useFormik({
    initialValues:{
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit : async (values)=>{
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/login`,(values));
        if(response && response?.data?.success){
          toast.success(response?.data?.message);
          setAuth({...auth,
          user : response?.data?.userExit,
          token : response?.data?.token
        })
        //saving token in localstorage
        localStorage.setItem('token', JSON.stringify(response.data))

          setTimeout(() => {
            window.location.reload();            
          }, 2000);
        }
        
      } catch (error) {
        if(error.response){
          toast.error(error.response.data.message);
        }
        else{
          toast.error("Something went wrong !")
        }
        
      }

    }
  })

  return (
    <>
      <div className="login">
        <h2 className="singupTextCenter">Login Here</h2>
        <form className="form" onSubmit={formik.handleSubmit}>
          <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" name="email" placeholder="Email" />
          {formik.touched.email && formik.errors.email && <p className="errors">{formik.errors.email}</p>}
          <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} type="password" name="password" placeholder="Password" />
          {formik.touched.password && formik.errors.password && <p className="errors">{formik.errors.password}</p>}
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
