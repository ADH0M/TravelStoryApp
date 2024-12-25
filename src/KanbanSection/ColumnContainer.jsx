/* eslint-disable react/prop-types */

import { TbTrash } from "react-icons/tb";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useMemo, useState } from "react";
import { PiPlusCircleDuotone } from "react-icons/pi";
import Task from "./Task";
import { DragOverlay } from "@dnd-kit/core";

const ColumnContainer = (props) => {
    const {title ,deleteColumn ,id , updateColumn , tasks , setTasks ,isActiveTask ,  handleChangeTasks , deleteTask }= props;
    const taskId = useMemo(()=>tasks.map(item=>item.id) ,[tasks])
    const [updateCol , setUpdatecol] = useState(false);
    
    const {listeners ,attributes , transition , transform ,setNodeRef ,isDragging} = useSortable({
        id,
        data:{
            type:"Column",
            column:{id,title}
        },
        disabled:updateCol
    });


    const style={
        transform :CSS.Transform.toString(transform),
        transition,
    };

    if(isDragging){
        return (<div
            ref={setNodeRef}
            style={style}
            className=" bg-transparent w-[20vw] h-80 flex flex-col gap-2 p-1 opacity-65
            rounded-lg outline-none  border-2 border-rose-400 overflow-y-hidden"
        >

        </div>)
    };




    

  return (
    <> 
        <div 
            ref={setNodeRef}
            style={style}
            className=" bg-gray-600 w-[20vw] h-80 flex flex-col gap-2 p-1 rounded-lg outline-none border-purple-200 overflow-y-hidden" 
         >
            <div 
                {...listeners} {...attributes}
                className=" bg-gray-800 p-2 rounded-md flex items-center justify-between"
            > 
                <div className="flex items-center gap-1" >
                    <p className="  rounded-full bg-gray-600 h-6 w-6 text-center text-gray-400 ">0</p>
                    <h3 className="text-primary capitalize font-semibold text-[18px]" onClick={()=>setUpdatecol(true)}>
                        {  updateCol && <input 
                                            type="text" 
                                            onKeyDown={(e)=>{
                                                if(e.key !=='Enter') return;
                                                return setUpdatecol(false);
                                            }} 
                                            value={title} 
                                            onChange={(e)=>updateColumn( id , e.target.value)} 
                                            autoFocus 
                                            className="w-32 outline-none border border-secondary rounded px-1" 
                                            onBlur={()=>{setUpdatecol(false)}} 
                                            /> }
                        { !updateCol && title }
                    </h3>
                </div>
                
                <TbTrash className="text-2xl text-gray-400 hover:text-rose-400 cursor-pointer" onClick={()=>{deleteColumn(id)}}/>
                

            </div>

            {/* column content */}
            <div className="flex-1 overflow-x-hidden overflow-y-auto flex flex-col w-full h-full">
            <SortableContext items={taskId}>
                {tasks.map(item=>(
                    item.columnId === id&&
                     <Task 
                        key={item.id} 
                        task={item} 
                        handleChangeTasks={handleChangeTasks} 
                        deleteTask={deleteTask}/>
                ))}
            </SortableContext>

            </div>

            {/* column footer */}
            <div 
                onClick={()=>addTasks(id)}
                className=" flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-900
                hover:text-primary text-white rounded-lg"
             
             >
                <PiPlusCircleDuotone className="text-2xl"/>
                <p>Add Task</p>
            </div>
        </div>
    </>
  );

function addTasks (columnId){
    setTasks((prev=>([...prev , {id:randomId() ,task:`task ${tasks.length  }`,columnId}])))
};

};

const randomId =()=>{
    return Math.floor(Math.random()*10001);
  };
export default React.memo(ColumnContainer)