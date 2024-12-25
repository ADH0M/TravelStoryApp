/* eslint-disable react/prop-types */
import { TbTrash } from 'react-icons/tb';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { useState } from 'react';



const Task = (props) => {
    const {task , deleteTask ,handleChangeTasks } = props ;

    const {listeners ,attributes ,setNodeRef , transform , transition ,isDragging} = useSortable({
      id:task.id ,
      data:{
        type:'task',
        task,
      }
    });

    const style={
      transform :CSS.Transform.toString(transform),
      transition,
  };

  const [editeMode , setEditMode ] = useState(false);
  
  if (isDragging){
    return (
      <div 
          ref={setNodeRef}
          style={style}
          className='bg-transparent my-2 p-2 rounded-lg cursor-pointer border-2 min-h-20
         border-rose-200  '
      />
    )
  }

  if(editeMode){
    return(
      <div
        ref={setNodeRef}
        {...listeners}{...attributes} style={style}
        className='bg-gray-700 my-2 p-2 rounded-lg cursor-pointer border
         border-gray-500 hover:border-gray-900 flex items-center justify-between '
      >
        
          <textarea 
          name="task" 
          id={task.id} 
          autoFocus 
          className='w-full outline-none border-none resize-none h-full 
          text-black bg-transparent ' 
            value={task.task} 
            onChange={(e)=>handleChangeTasks(e,task.id)}
            onBlur={toggleEditMode}
            onKeyDown={(e)=>{
              if(e.key ==='Enter' && e.shiftKey)return toggleEditMode();
            }}
            >
            
          </textarea>
          
      </div>
    )
  }

  return (
    <div
        onClick={toggleEditMode}
        ref={setNodeRef}
        {...listeners}{...attributes} style={style}
        className='bg-gray-700 my-2 p-2 rounded-lg cursor-pointer border min-h-20
         border-gray-500 hover:border-gray-900 flex items-center justify-between '
        >

        <div className='w-full relative overflow-hidden h-full'> 
            <p className='my-auto   w-full whitespace-pre-wrap overflow-x-hidden overflow-y-auto task '>
              {task.task}
            </p>
        </div>

        <TbTrash 
          className='text-lg stroke-white
         hover:stroke-rose-500 min-w-5 active:stroke-rose-800 ' 
         onClick={()=>deleteTask(task.id)}/>

    </div>
  );
function toggleEditMode (){
  return setEditMode(prev=>!prev);
}
}

export default Task;