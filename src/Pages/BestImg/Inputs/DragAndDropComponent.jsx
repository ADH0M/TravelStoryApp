import  { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import image1 from '../../../assets/images/about.jpg';
import image2 from '../../../assets/images/vestrahorn.jpg';

const DragAndDropComponent = () => {
  const [itemsA, setItemsA] = useState(["Item A1", "Item A2", "Item A3"]);
  const [itemsB, setItemsB] = useState(["Item B1", "Item B2", "Item B3"]);
  const [itemsC, setItemsC] = useState(["Item C1", "Item C2", "Item C3"]);

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;

        if(over?.id==='containerA' && itemsA.includes(active.id)){
            return
        };
        if(over?.id ==='containerB' && itemsB.includes(active.id)){
            return
        };
        if(over?.id==='containerC' && itemsC.includes(active.id)){
            return
        }

    
    if (over) {
      const sourceContainer = active.data.current.sortable.containerId;
      const targetContainer = over.id;
      
      if (sourceContainer !== targetContainer) {
        // Get the index of the dragged item in its source container
        const activeIndex = active.data.current.sortable.index;
        const item = active.data.current.sortable.item;


        // Move item to the target container
        if (targetContainer === "containerA") {
          moveItem(activeIndex, item, setItemsA, setItemsB, setItemsC);
        } else if (targetContainer === "containerB") {
          moveItem(activeIndex, item, setItemsB, setItemsA, setItemsC);
        } else if (targetContainer === "containerC") {
          moveItem(activeIndex, item, setItemsC, setItemsA, setItemsB);
        }
      }
    }
  };

  // Helper to move an item
  const moveItem = (index, item, setTarget, setSource1, setSource2) => {
    // Remove item from the source container and add to the target container
    setTarget(prev => [...prev, item]);
    setSource1(prev => prev.filter((_, i) => i !== index));
    setSource2(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Container id="containerA" items={itemsA} setItems={setItemsA} />
          <Container id="containerB" items={itemsB} setItems={setItemsB} />
          <Container id="containerC" items={itemsC} setItems={setItemsC} />
        </div>
      </DndContext>
    </div>
  );
};

// A Container that can hold draggable items
const Container = ({ id, items, setItems }) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  
  return (
    <div
      ref={setNodeRef}
      style={{
        width: "200px",
        minHeight: "300px",
        border: "1px solid black",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h3>{id}</h3>
      {items.map((item, index) => (
        <DraggableItem
          key={index}
          id={item}
          index={index}
          items={items}
          setItems={setItems}
        />
      ))}
    </div>
  );
};

// A Draggable Item that you can drag between containers
const DraggableItem = ({ id, index, items, setItems }) => {
  const { attributes, listeners, setNodeRef, isDragging ,transform  } = useDraggable({
    id,
    data: { sortable: { index, item: id, containerId: id } },
  });



  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "10px",
        border: "1px solid gray",
        marginBottom: "5px",
        backgroundColor: isDragging ? "lightgray" : "white",
        cursor: "move",
        transform: transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }}
    >
      {id}
    </div>
  );
};

export default DragAndDropComponent;
