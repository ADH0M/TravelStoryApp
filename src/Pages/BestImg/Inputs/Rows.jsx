/* eslint-disable react/prop-types */
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable"
import Tasks from "./Tasks"

const Rows = ({value}) => {

  return (
   <SortableContext items={value} strategy={horizontalListSortingStrategy}>
        <div className="flex gap-4">
          {value.map(task=>(
              <Tasks key={task.id} task={task} />
          ))}
        </div>
   </SortableContext>
  )
}

export default Rows