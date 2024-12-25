/* eslint-disable react/prop-types */

import React, { useState } from "react";
import moment from "moment";
import { BiTrash } from "react-icons/bi";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import { useDispatch } from "react-redux";
import {removeImg} from '../../Store/favoriteReduer';

const Images = (props) => {
    const {img ,successToast, errorToast} = props;

    const dispatch = useDispatch();

    const [loading , setLoading ] = useState(true);
    const loadContent = (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-5 h-5 rounded-full text-white border-r-2 border-t-2 border-primary animate-spin "/>
    );

    const handleLoad = ()=>{
        setLoading(false);
    };

    const {listeners , attributes , setNodeRef , transform ,transition ,isDragging} = useSortable({
        id:img.id,
        data:{
                img ,
                column:'Column'
            }
    });

    const style ={
            transition,
            transform:CSS.Transform.toString(transform) 
        };


    
        
    if(isDragging){
        return(
            <div className='w-full h-full rounded-lg relative border-2 border-primary' ref={setNodeRef} style={style}/>
        );
    };




  return (
    <div className='w-full h-full bg-cyan-100 rounded-lg relative' ref={setNodeRef} style={style} >

        <div className="relative cursor-pointer overflow-hidden rounded-t-lg" {...listeners } {...attributes}>
            {loading && loadContent}
            <img src={img.imgUrl} alt={img.name} className="w-full hover:opacity-80 h-[250px] rounded-t-lg hover:scale-110 transition-all duration-200 ease-out" onLoad={handleLoad} loading="lazy"/>
        </div>

        <BiTrash 
            className="absolute top-2 right-2 text-xl hover:bg-gray-100/30 w-6 
            rounded-l-sm text-gray-200 active:text-red-600 hover:text-red-600 cursor-pointer"
            onClick={()=>handleDeleteImg(img.id)}
            />
        
        <div className="p-2 ">
            <h4 className="text-gray-600 uppercase font-semibold ">{img.name}</h4>
            <p className="text-primary text-sm ">
                {img.date ? moment(img.date).format('MMMM Do YYYY') : moment().format('MMMM Do YYYY')}
            </p>
        </div>

    </div>
  );

  function handleDeleteImg (id){
    dispatch(removeImg(id));
    errorToast()
    return 
  }
}

export default React.memo( Images)