import { useState } from "react"
import Rows from "./Rows";
import {closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors}from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const Shown = () => {
    const [value ,setValue] =useState([
        { id: 1, title: "Add tests to homepage" },
        { id: 2, title: "Fix styling in about section" },
        { id: 3, title: "Learn how to center a div" },
      ]);

      const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );
      
    const getIndex = (id)=> value.findIndex(item => item.id === id);

    const handleDragEnd =(e)=>{
      const {active , over } = e ;
  
      if(active.id === over.id) return ;
      
      setValue(()=>{
        const originalPos =getIndex( active.id);
        const newPos      =getIndex( over.id  );        
        return arrayMove(value , originalPos, newPos);
      });
      
    }
    

  return (
    <div>
        <DndContext 
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCorners}
        >
          
          <Rows value={value}/>
        </DndContext>
    </div>
  )
}

export default Shown