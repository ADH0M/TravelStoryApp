import { useState } from "react";
import {
  DndContext,
} from "@dnd-kit/core";

import { Column } from "./Culmons";

import image1 from'../../../assets/images/login.jpg';
import image2 from'../../../assets/images/vestrahorn.jpg';
import image3 from'../../../assets/images/signup.jpg';
import { arrayMove } from "@dnd-kit/sortable";


const images =[
  {id:1 ,title:image1 }, 
  {id:2, title:image2 },
  {id:3 ,title:image3 } 
];

export default function DragAndDropTasks() {
  const [tasks, setTasks] = useState(images);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);


  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      console.log(originalPos);
      console.log(newPos);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  console.log(tasks);
  

  return (
    <div className="App">
      <h1>My Tasks ✅</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <Column id="toDo" tasks={tasks}/>
      </DndContext>
    </div>
  );
}