import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CgRemoveR } from "react-icons/cg";
import { PiPlus } from "react-icons/pi";

const Contacts = () => {
    const element = useRef(null);
    const[ele ,setEle] =useState(false);

    
    
    const counter = (
        <div>
            <p>vlaue </p>
            <button className="text-green-400 m-auto mx-3" onClick={()=>dispatch(increment())}><PiPlus className="text-xl"/> add value</button>
            <button className="text-red-400" onClick={()=>dispatch(decrement())} >< CgRemoveR className="text-xl" /> add remove</button>
            <button className="text-red-400" onClick={()=>dispatch(reset())} >< CgRemoveR className="text-xl" /> add remove</button>
        </div>
    );

    
  return (
    <>
        <div className="p-20 ">
            <p className="border border-gray-400 w-[400px] h-[400px] bg-stone-300 " ref={element}>
                hello world;
            </p>
            <button className="text-center ml-20 p-5 border"
                onClick={()=>setEle(!ele)}
            >
                click
            </button>
        </div>
        {ele && createPortal(counter , element.current)}
    </>
  )
}

export default Contacts;