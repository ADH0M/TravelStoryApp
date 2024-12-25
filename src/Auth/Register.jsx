import { useNavigate } from "react-router-dom";
import axios from "../Api/axios";
import PwdInputs from "../Components/layout/PwdInputs";
import { useEffect, useRef, useState } from "react";
import useAuth from "../Hooks/useAuth";

const USER_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';
const FAILD = {
  username:'' , 
  password:'' , 
  passwordConfirm:''
};
const OPERATION={
  succes:false ,
  err:false , 
  errMessage:'',
}

const Register= ()=>{
  const {setAuth} =useAuth();

  const userRef = useRef();
  const errRef  = useRef();

  const [formData , setFormData ] = useState(FAILD);
  const [focus , setFocus] = useState(FAILD);
  const [valid ,setValid ] = useState(FAILD);

  const [action , setAction] = useState(OPERATION);

  const handleChange = (e)=>{
    const {name , value} = e.target ; 
    setFormData((prev)=>{
      return {...prev , [name]:value}
    });
  };

  const handleFouce = (e , type )=>{
    const {name } = e.target ; 
    if(type === 'focus') return setFocus((prev)=>{return {...prev , [name]:true}});
    if(type ==='blur') return setFocus((prev)=>{return {...prev , [name]:false}});
  };
  
  const navigate= useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const v1 =valid.username ;
    const v2 =valid.passwordConfirm ;
    try{
      if(!v1 || !v2 ){
        return setAction((prev)=>{
          return{ ...prev ,errMessage:'invalid register'}
        });
      };

      const res = await axios.post(REGISTER_URL ,{user:formData.username ,pwd:formData.password} , {
        headers: { 'Content-Type': 'application/json' },
        withCredentials:true
      } );

      setFormData(FAILD);
      setAction((prev)=>{
        return {...prev , succes:true ,errMessage:''}
      });
      
      setAuth((prev)=>{
        return {...prev , username:formData.username , password:formData.password}
      });

    }catch(err){
      if(!err?.response){
        return setAction((prev)=>{
          return {...prev ,  errMessage:'no server response'}
        }); 
      }else if(err?.response?.status === 401){
        return setAction((prev) =>{
          return {...prev , errMessage:'unauthorized'}
        });
      }else if(err?.response?.status === 409){
        return setAction((prev) =>{
          return {...prev , errMessage:'user taken'}
        })
      }else{
        setAction((prev) =>{
          return {...prev , errMessage:'Regeistration Failed'}
        });
      }
      errRef.current.focus();
    }
  };

  useEffect(()=>{
    setValid((prev)=>{ return {...prev , username:USER_REGEX.test(formData.username)}})
  } ,[formData.username ]);

  useEffect(()=>{
    setValid((prev)=>{ return {...prev , password:PWD_REGEX.test(formData.password) ,passwordConfirm: formData.password === formData.passwordConfirm  }});

  } ,[formData.password ,formData.passwordConfirm]);

  useEffect(()=>{
    userRef.current.focus()
  } ,[]);

  useEffect(()=>{
    setAction((prev)=>{
      return {...prev , errMessage:''}
    });
  },[formData.username , formData.password ,formData.passwordConfirm])

  return(

    <>
    {action.succes 
    ? <>
        <section>
          <h1>registration succefull .</h1>
          <h2>login</h2>
        </section>
      </> 
    :<>
    

    
    <section className="overflow-hidden h-screen bg-cyan-50">
    <div className="login-ui-box right-10 -top-40"/>
    <div className="login-ui-box bg-cyan-200 right-1/2 -bottom-40"/>
        <div className="container flex h-screen flex-col md:flex-row items-center mx-auto md:p-20 p-1  ">

          <div className="h-[90vh] md:w-1/2 w-full  flex  items-end bg-signup-bg-img bg-cover bg-center rounded-2xl p-7 z-50">
              <div>
                <h4 className='text-5xl font-semibold leading-[48px] text-white'>
                          Join the <br />
                          Adventure 
                      </h4>
                      <p className="mb-5 text-primary text-xl mr-3  mt-2 leading-6">
                          Record your travel experiences and memories in your personl 
                          travel journal. 
                      </p>
                </div>
          </div>

          <div className="md:w-1/2 w-full h-[70vh] bg-white p-16 rounded-r-xl z-40 bg-opacity-60">
            <p ref={errRef} className={`text-center text-red-400 capitalize ${action.errMessage ?'block' :'hidden'}`}>{action.errMessage} </p> 
            <h2 className="text-3xl capitalize mb-5 text-primary">register</h2>
            <form onSubmit={handleSubmit}>

              <label htmlFor="username"  >
                <div className="relative">
                  <p> 
                    {valid.username  &&  <span className="input-alert-valid"> &#x2705; </span>  }
                    {!valid.username && formData.username &&  <span className="input-alert-notValid">&#x274C;</span>    } 
                  </p>
                  <input 
                    className="input-box"
                    placeholder="username"
                    name="username"
                    ref={userRef}
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    onFocus= { (e) => handleFouce (e ,'focus')}
                    onBlur = { (e) => handleFouce (e ,'blur') }
                    aria-live="assertive"
                    aria-describedby="uidnote"
                  />
                </div>

                <p id="uidnote" className={`input-alert-message ${formData.username && !valid.username && focus.username ?'block' :'hidden'}` } >
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens , sapce allowed.
                </p>
              </label>

              <label htmlFor="password" >
              <div className="relative">
                  <p>
                    {valid.password  &&  <span className="input-alert-valid  "> &#x2705; </span>  }
                    {!valid.password && formData.password &&  <span className="input-alert-notValid  ">&#x274C;</span>    } 
                  </p>

                <PwdInputs
                  type="text"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={(e)=>handleFouce(e ,'focus')}
                  onBlur={(e)=>handleFouce(e ,'blur')}
                  aria-invalid={valid.password? 'true' :'false'}
                  name="password"
                />
              </div>
              <p className={`input-alert-message ${!valid.password && formData.password && focus.password ?'block' :'hidden'}`}>
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> 
                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> 
                <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
            </label>

            <label htmlFor="" >
              <div className='relative'>

              <p>
                {valid.passwordConfirm && formData.passwordConfirm  &&  <span className="input-alert-valid "> &#x2705; </span>  }
                {!valid.passwordConfirm && formData.passwordConfirm &&  <span className="input-alert-notValid ">&#x274C;</span>    } 
              </p>

              <PwdInputs
                placeholder="confirm password"
                name="passwordConfirm"
                type="text"
                value={formData.passwordConfirm}
                onChange={handleChange}
                onFocus={(e)=>handleFouce(e ,'focus')}
                onBlur={(e)=>handleFouce(e ,'blur')}
                autoComplete="off"
              />
              </div>

              <p className={`input-alert-message ${!valid.passwordConfirm && formData.passwordConfirm && focus.passwordConfirm ?'block' :'hidden'}`}>
                Must match the first password input field.
              </p>

            </label>

            <button type="submit" className="btn-primary" onClick={handleSubmit}>Create Accounte </button>
              <p className="text-center mb-5 text-gray-400">or</p>
              <button type="button" className="btn-secondary" onClick={()=>{ navigate("/login") }} >login</button>

            </form>
          </div>

        </div>

    </section>
    </>}
    </>

  )
}


export default Register