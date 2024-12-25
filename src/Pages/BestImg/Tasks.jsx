/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
const Tasks = ({value}) => {
    const {attributes, listeners , setNodeRef ,transition ,transform} =useSortable({id:value._id});
    const style={
        transition , 
        transform:CSS.transform.toString(transform)
    }

  return (
    <>
        <div className='h-full' ref={setNodeRef} {...attributes}{...listeners} style={style} >
            <img src={value.imageUrl} alt="" className='h-[300px]' />
         </div>

    </>
  )
}

export default Tasks