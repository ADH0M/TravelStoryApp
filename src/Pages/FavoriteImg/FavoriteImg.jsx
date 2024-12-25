import { useDispatch, useSelector } from "react-redux";
import Images from "./Images";
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React, { useMemo, useState } from "react";
import { reSortImg } from "../../Store/favoriteReduer";
import { toast, ToastContainer } from "react-toastify";
import TopPage from "./TopPage";

const FavoriteImg = () => {
  const img = useSelector(state => state.favoriteImg);
  const dispatch = useDispatch();
  const [isActive  ,setIsActive ] = useState(null);

  const columns = useMemo(()=> img?.map(item => ({id:item.id ,name:item.name}) ) , [img]);
  
  const successToast = () => toast.success("Upload Imgae Success !");
  const errorToast = () => toast.error("Delete Image Success!");

  const sensors = useSensors(
    useSensor(PointerSensor,{activationConstraint:{distance:5}}),
    useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
     })
  );
  return (
        <>
            <TopPage text={'hi...'}/>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
               <p className=" capitalize px-4 pt-1 w-full bg-gray-400 opacity-70">
  
                use drag and drop to sort your image
              </p> 
                {img.length <= 0? 
                
                <div className="text-stone-400 p-2 capitalize text-sm absolute top-1/2 left-1/2 -translate-x-1/2 ">there are no Images  </div>   
                :

                <div className="container mx-auto  grid grid-cols-3 grid-rows-3 px-3 gap-3 relative bg-cyan-50 ">
                  <SortableContext items={img}>
                    {img?.map(item=>(
                      <Images img={item} key={item.id}  successToast={successToast} errorToast={errorToast} />
                      ))} 
                  </SortableContext>
                  
                  {isActive && 
                    <DragOverlay>
                      <Images img = {isActive} successToast={successToast} errorToast={errorToast}/>
                    </DragOverlay>
                  }
                </div>
                }
            </DndContext>
            {/* ToastContainer should be rendered at the root of the app */}
             <ToastContainer/>
        </>
  );

  function handleDragStart (event){
    const {active } = event ;
    
    if(active.data.current?.column ==='Column'){
      setIsActive(active.data.current?.img );
    }    

  };

  function handleDragEnd (event) {
    
    const {active ,over } = event ; 
    if(!over) return ;
    const nextColumn = over.id ;
    const prevColumn = active.id

    if(nextColumn === prevColumn ) return ;

    const nextElement    = img.findIndex(item => item.id === nextColumn);
    const currentElement = img.findIndex(item => item.id === prevColumn);
    
   
    dispatch(reSortImg(
      arrayMove(img , currentElement ,nextElement)
    ));

  };
}

export default React.memo(FavoriteImg);