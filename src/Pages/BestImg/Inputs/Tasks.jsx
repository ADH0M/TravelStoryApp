/* eslint-disable react/prop-types */
import { useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'
const Tasks = ({task}) => {
    const {listeners ,attributes ,transform ,transition ,setNodeRef:draggableRef}=useSortable({id:task.id});
    const style={
        transition,
        transform: CSS.Translate.toString(transform)
        
    }
    const {setNodeRef:sortableRef} = useDraggable({id:task.id});
    const combinedRef = (node) => {
      draggableRef(node); // Call the draggable ref
      sortableRef(node); // Call the sortable ref
    };
  return (
    <div
     className='bg-gray-600 p-1 text-white rounded-lg ml-2  text-center cursor-grab'
     ref={combinedRef}
     {...listeners}
     {...attributes}
     style={style}
     >
        <h1>{task.id}</h1>
        <p>{task.title}</p>
    </div>
  )
}

export default Tasks