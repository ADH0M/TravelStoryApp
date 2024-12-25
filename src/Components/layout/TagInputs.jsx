import React, { useState } from 'react'
import { GrMapLocation } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';

const TagInputs = () => {
    const [loaction , setLoactoin ] = useState('');
    const [tags , setTags] = useState([]);

    const handleInput = (e)=>{
        e.preventDefault();
        setLoactoin(e.target.value)
    };

    const inputTrim = ()=>{
        if(loaction.trim()!= ''){
            setTags([...tags , loaction.trim()]);
            setLoactoin('');

        }
    }
    const handleKeyDown = (e)=>{
        if(e.key ==='Enter'){
            inputTrim();
        }
    }

    const handleDelteTag =(e)=>{
        const newTags = tags.filter(item => item !== e )
        return setTags(newTags);
    }
    return (
    <div>
        <div>loaciton :{loaction}</div>
        <p className='flex '>
            {tags.map((item ,index)=>{
                return (
                    <span key={index} className='mx-2 flex justify-center items-center bg-gray-50 w-fit px-1 '>
                        <GrMapLocation/>
                        {item.trim()}
                        <MdDeleteForever
                            onClick={()=>handleDelteTag(item)}
                         className='bg-rose-300 text-lg ml-2 hover:text-white hover:bg-rose-500 cursor-pointer rounded-full'/>
                    </span>

                )
            })}
        </p>

        <input 
            type="text" 
            placeholder='add loaction'
            value={loaction}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
        />
        <button 
            type='button'
            onClick={inputTrim}
        >click </button>
    </div>
  )
}

export default TagInputs