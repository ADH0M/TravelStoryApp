/* eslint-disable react/jsx-key */

import { useState } from "react";
import Secetions from "./Secetions";
import { DndContext } from "@dnd-kit/core";

const COLUMNS = [
    { id: 'TODO', title: 'To Do' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
    { id: 'DONE', title: 'Done' },
  ];
  
  const INITIAL_TASKS = [
    {
      id: '1',
      title: 'Research Project',
      description: 'Gather requirements and create initial documentation',
      status: 'TODO',
    },
    {
      id: '2',
      title: 'Design System',
      description: 'Create component library and design tokens',
      status: 'TODO',
    },
    {
      id: '3',
      title: 'API Integration',
      description: 'Implement REST API endpoints',
      status: 'IN_PROGRESS',
    },
    {
      id: '4',
      title: 'Testing',
      description: 'Write unit tests for core functionality',
      status: 'DONE',
    },
  ];


const DndPage = () => {
  const [tasks , setTasks ] =useState(INITIAL_TASKS);
  const handleDragEnd=(e)=>{
    const {active ,over} = e;
    if(!over)return;
    const nextId  = active.id ; 
    const element = over.id ;
    
    console.log(nextId ,element);
    

    setTasks((prev)=>
      prev.map(item => item.id===nextId ?{...item, status :element}:item ));

  }

  console.log(tasks);
  
  return (
    <div className=" p-20 border border-black h-fit">
        <h2 className="bg-gray-700 p-2 rounded-lg  text-white mb-4">
          Title: Drag and Drop 
        </h2>
      <div className="flex justify-around">
        <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map(item=>(
              <Secetions tasks={tasks} id={item.id}  title={item.title} key={item.id}/>
            ))}
        </DndContext>
      </div>
    </div>
  )
};

export default DndPage