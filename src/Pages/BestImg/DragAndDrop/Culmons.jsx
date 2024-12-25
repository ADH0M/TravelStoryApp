/* eslint-disable react/prop-types */
import {
    horizontalListSortingStrategy,
    SortableContext,
    verticalListSortingStrategy,
  } from "@dnd-kit/sortable";



import { Task } from "./Tasks";
  
  export const Column = ({ tasks }) => {
    return (
      <div className="flex">
        <SortableContext items={tasks} strategy={horizontalListSortingStrategy}>
          {tasks.map((task) => (
            <Task key={task.id} id={task.id} title={task.title} />
          ))}
        </SortableContext>
      </div>
    );
  };