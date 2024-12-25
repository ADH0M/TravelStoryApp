import { useState ,useRef, useEffect } from "react";
import PwdInputs from "../Components/layout/PwdInputs";
import { useNavigate } from "react-router-dom";
import axios from "../Api/axios";
import useAuth from "../Hooks/useAuth";

const Login = () => {
    const emailRef = useRef(null);
    const errRef = useRef(null);
    const navigate =useNavigate();
    const [formData , setFormData]=useState({
        password:'',
        email:'',
    });
    const {setAuth } =useAuth();

    const [error , setError ] =useState({
        password:'',
        email:'',
    });

    const handleChange =(e)=>{
        const {name ,value} = e.target;
        setFormData((prev)=>{
            return {...prev , [name]:value}
        });
    };
    
    
    
    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(!formData.password){
            setError((prev)=>{
                return {...prev , password:'password valid is require .'}
            });
            return;
        };
        setError({form:'',email:'' ,password:''});

       try{
            const res = await axios.post ('auth',{user:formData.email ,pwd:formData.password} ,{withCredentials:true});            
            setAuth({email:formData.email ,password:formData.password , accessToken:res.data.accessToken , roles:res.data.roles});
            navigate('/')
        }catch(err){
        if(err?.response?.data){
            setError((prev)=>{
                return {...prev , form:err?.response?.data }
            })
            errRef.current.focus()
        }
       }
    };
    
    // autoFocus use ref..
    useEffect(()=>{
        emailRef.current.focus();
    } ,[]);
    

  return (
    <div className="h-screen bg-cyan-50 overflow-hidden  relative">
        <div className="login-ui-box right-10 -top-40"/>
        <div className="login-ui-box bg-cyan-200 right-1/2 -bottom-40"/>

        <div className="container  md:mt-1 flex flex-col  h-screen justify-center items-center md:p-20 p-2 mx-auto md:flex-row  ">

            <div className="sm:w-1/2 flex items-end h-[90vh] bg-login-bg-img bg-cover bg-center  rounded-xl p-7 z-50 w-full">
                <div>
                    <h4 className="text-white text-5xl font-semibold leading-[58px] mb-4">
                        Caputer Your <br />
                        Journeys 
                    </h4>
                    <p className="text-white leading-6 pr-7 mb-5">
                        Record your travel experiences and memories in your personl 
                        travel journal. 
                    </p>
                </div>
            </div>

            <div className="sm:w-1/2 w-full h-[70vh] bg-white  bg-opacity-50 -mt-20 rounded-r-lg p-16 z-40 ">

               <form onSubmit={handleSubmit}>
                   <p ref= {errRef } className="text-center text-red-400">{error?.form}</p>
                    <h4 className="mb-7 text-4xl font-semibold  w-full md:text-left text-center mt-4 md:mt-0" >Login</h4>
                    <p className="text-red-500 capitalize"> {error.email} </p>
                    <input type="text" placeholder="email or username" name="email" id="" className="input-box w-full" ref={emailRef} onChange={handleChange} value={formData.email}/>
                    <p className="text-red-500 capitalize"> {error.password} </p>
                    <PwdInputs name='password' change={handleChange} value={formData.password}/>
                    <button type="submit" className="btn-primary">Login</button>
                    <p className="w-full text-center text-stone-600 mb-5">or</p>
                    <button type="button" className="btn-secondary" onClick={()=>navigate('/register')}>Create Account</button>
               </form>
            </div>

        </div>
    </div>
  )
}

export default Login