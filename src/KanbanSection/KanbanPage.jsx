/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo, useState } from "react";
import { CgAdd } from "react-icons/cg";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Task from "./Task";

const kanbanPage = () => {
  const [columns , setColumns ] =useState([]);
  const [tasks , setTasks ] = useState([{id:31241 , task:'one'}]);
  

  const columnsId = useMemo(()=> columns.map(col=>col.id) ,[columns] );
  
  const [isActive , setIsActive] =useState(null);

  const [isActiveTask , setIsActiveTask] =useState(null);
  
  

  const sensor = useSensors(useSensor(PointerSensor,{activationConstraint:{distance:5}}));
  
  return (
    <div className='flex bg-cyan-50 w-full h-[100vh] p-20 '>
        <div className="flex justify-center items-center bg-gray-800 w-full h-full rounded-lg overflow-auto">
          
            <DndContext onDragStart={dragStart} onDragEnd={dragEnd} sensors={sensor} onDragOver={dragOver}>

              <div className="flex gap-2 mx-2  items-start ">
                {/* column section */}
                <SortableContext items={columnsId} strategy={horizontalListSortingStrategy}>
                  {columns?.map(item =>(
                    <ColumnContainer  key={item.id}  
                                      title ={item.column} 
                                      deleteColumn={deleteColumn} 
                                      id={item.id}  
                                      updateColumn={updateNewColumn}
                                      tasks={tasks}
                                      setTasks={setTasks}
                                      isActiveTask={isActiveTask}
                                      handleChangeTasks={handleChangeTasks} 
                                      deleteTask={deleteTask}
                                      /> )
                  )}
                </SortableContext>

              <button 
                onClick={generateColumns}
                className="inline-flex items-center gap-2 justify-center border-2 border-primary
                 p-2 rounded-lg outline-none hover:border-pink-400 "
                >

                <CgAdd className="text-white text-xl "/>
                <p className="text-white font-medium">Add Column</p>

              </button>

              </div>

              {createPortal(
                <DragOverlay>
                  {isActive &&<ColumnContainer  
                                  title ={isActive.title} 
                                  deleteColumn={deleteColumn} 
                                  id={isActive.id}  
                                  updateColumn={updateNewColumn} 
                                  tasks={tasks}
                                  setTasks={setTasks}
                                  handleChangeTasks={handleChangeTasks} 
                                  deleteTask={deleteTask}
                                  isActiveTask={isActiveTask}
                                  /> 
                  }
                  {
                    isActiveTask && <Task task={isActiveTask}  handleChangeTasks={handleChangeTasks} deleteTask={deleteTask}/>
                  }

                </DragOverlay> ,
                document.body
              )}
            </DndContext>
              
        </div>
    </div>
  );

function generateColumns() {
    const column ={
      id:randomId() ,
      column:`Map ${columns.length + 1 }`
    }
    setColumns([...columns , column]);
};

function updateNewColumn (id ,title){
  const newCol = columns.map(item=>{
    if(item.id !==id) return item;
    return {...item ,column:title}
  });
    setColumns(newCol)
}

function deleteColumn (id){
  setColumns((prev)=>prev.filter(item=> item.id !== id ));
  setTasks((prev)=>prev.filter(item=> item.columnId !==id));
  
};

function dragStart(e){
  if(e.active.data.current?.type ==='Column'){
      setIsActive(e.active.data.current.column);
      return;
  }; 
  if(e.active.data.current?.type ==='task'){
    setIsActiveTask(e.active.data.current.task);
    return;
}; 

};

function dragOver(e){
  const {active ,over} = e ;
  if(!over ) return ;
  const orginalTask = active.id ;
  const nextTask    = over.id   ;
  const isActiveTask =active.data.current?.type ==='task';
  const isOverTask =over.data.current?.type ==='task';

  // I'm droppin a task to anthor task .
  
  if(isActiveTask && isOverTask ){
    const orignalIndex = tasks.findIndex(item=>item.id === orginalTask);
    const nextIndex = tasks.findIndex(item=>item.id=== nextTask);
    setTasks((prev)=>{
      tasks[orignalIndex].columnId = tasks[nextIndex].columnId;
      return arrayMove(prev , orignalIndex ,nextIndex);
    });
  }
  
  // I'm dropping a task over anther task .
  const isOverAColumn = over.data.current?.type==='Column';
  if(isActiveTask && isOverAColumn ){
    const activeIndex = tasks.findIndex(item=>item.id === orginalTask)
    setTasks((prev)=>{
      tasks[activeIndex].columnId = nextTask;
      return arrayMove(prev , activeIndex ,activeIndex);
    });
  }
}

function dragEnd(e){
  setIsActive(null);
  setIsActiveTask(null);
  const {active , over} = e ; 
  
  if(!over) return ;
  const acitveCol =active.id ; 
  const overCol =over.id ; 
  
  if(acitveCol === overCol) return ; 

  setColumns((prev)=>{
    const activeColIndex = prev.findIndex(col=>col.id===acitveCol);
    const overColIndex = prev.findIndex(col=>col.id===overCol);
    return arrayMove(prev , activeColIndex,overColIndex)
  });
};

function deleteTask (id){
  setTasks(prev =>{
      return prev.filter(item => item.id !== id)
  })
};

function handleChangeTasks (e , id ){
  setTasks(prev => prev.map(item => item.id ===id ? {...item , task:e.target.value} :item ))

}

};

const randomId =()=>{
  return Math.floor(Math.random()*10001);
};



export default React.memo(kanbanPage);