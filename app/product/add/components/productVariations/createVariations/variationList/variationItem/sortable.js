import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, edit, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f8f8f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
      {!edit && (
        <button {...attributes} {...listeners} style={{ cursor: "grab" }}>
          ☰
        </button>
      )}
    </div>
  );
};
