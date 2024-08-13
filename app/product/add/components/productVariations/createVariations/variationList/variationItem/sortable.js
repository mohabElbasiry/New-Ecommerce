import React, { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, edit,disabled, children }) => {
  console.log(disabled,'disabled');
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {!edit && (
       <>
       {
        !disabled? <button  {...attributes} {...listeners}
        type="button" style={{ cursor: "grab",width:'2%' }}>
         ☰
       </button >:<button  type="button" >
         ☰
       </button>
       }
       </>
      )}
      <div className="w-[98%] block flex-row">{children} </div>
    </div>
  );
};
export default memo(SortableItem);
