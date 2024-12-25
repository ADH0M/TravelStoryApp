/* eslint-disable react/prop-types */
import { useState } from "react"; 
import { FaRegEye ,FaRegEyeSlash } from "react-icons/fa";

const PwdInputs = ({value , change , placeholder='password' , ...props}) => {
  const [showPwd , setShowPwd ]= useState(false);
  const showEye = ( showPwd ? 
      <FaRegEye onClick={()=>{setShowPwd(false)}} className="text-xl text-primary "/> 
    : <FaRegEyeSlash onClick={()=>{setShowPwd(true)}} className="text-xl text-stone-600"/>
   );
  
  return (
    <div className="pwd-input">
        <input 
          type={showPwd ?'text':"password"} 
          value={value} 
          onChange={change}  
          placeholder={placeholder} 
          className="w-full py-[10px] outline-none"
          autoComplete="true"
          {...props} 
    
          />
          <span className="cursor-pointer">
            {showEye}
          </span>
    </div>
  )
}

export default PwdInputs