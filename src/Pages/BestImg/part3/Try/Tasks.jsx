/* eslint-disable react/prop-types */

import { useDraggable } from "@dnd-kit/core"


const Tasks = ({task}) => {
const {listeners , attributes , transform ,setNodeRef}=useDraggable({id:task.id});

const style = transform
? {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
  }
: undefined;
// const combinedRef = (node) => {
//     draggableRef(node); // Call the draggable ref
//     sortableRef(node); // Call the sortable ref
//   };
    
  return (
    <div className="bg-cyan-200 mt-3 rounded-md mb-2 p-2" ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <h3 className="text-secondary font-semibold ">{task.title}</h3>
      <article className="text-primary ">
        {task.description}
      </article>
    </div>


  )
}

export default Tasks