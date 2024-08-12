import React, { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, edit,customcss, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
     margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position:'relative',
    height:'fit-content',
    margin:'auto 0px'
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="w-[98%] block flex-row">{children} </div>
      {!edit && (
        <button {...attributes} {...listeners} className={`${customcss}`}
         style={{ cursor: "grab"  }}>
          ☰
        </button>
      )}
    </div>
  );
};
export default memo(SortableItem);
