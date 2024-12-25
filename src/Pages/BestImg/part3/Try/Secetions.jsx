/* eslint-disable react/prop-types */

import Tasks from "./Tasks";
import { useDroppable } from "@dnd-kit/core";

const Secetions = ({tasks ,id , title}) => {
  const {setNodeRef }= useDroppable({id:id});
    
  return (
    <div className="w-80 rounded-lg bg-neutral-800 p-4 mb-4 ">
        <h2 className="text-white font-semibold ">{title}</h2>
        <div className="h-full w-full" ref={setNodeRef}>
          {tasks?.filter(item =>item.status ===id).map( item =>
            <Tasks key={item.id} task = {item} />
          )}
        </div>
    </div>
  )
}

export default Secetions