import Image from "next/image";
import React, { useEffect, useState } from "react";
import UploadFilesModal from "./UploadFilesModal";
import { Reorder } from "framer-motion";
import { produce } from "immer";
import ImageItemDrag from "./ImageItemDrag";
import { cn } from "@/lib/utils";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function ProductImages({ submitedData, setSubmitedData }) {
  const HandleSubmit = (images) => {
    console.log(images);
    setSubmitedData(
      produce((prev) => {
        if (!prev.images) {
          prev.images = [];
        }
        images.forEach((image) => {
          if (!prev.images.some((existingImage) => existingImage === image)) {
            prev.images.push(image);
          }
        });
      })
    );
  };

  const handleReorder = (images) => {
    setSubmitedData(
      produce((draft) => {
        draft.images = images;
      })
    );
  };

  useEffect(() => {
    const urls = [
         "1","2","3","4","5","6","7","8","9","10","11"
    ];
    handleReorder(urls)
  }, []);
  const [items, setItems] = useState(["1","2","3","4","5","6","7","8","9","10","11"]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    setItems(reorderedItems);
  };

  
//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//     <Droppable droppableId="droppable">
//     {(provided) => (
//           <div {...provided.droppableProps} ref={provided.innerRef}>
//             {items.map((item, index) => (
//               <Draggable key={item.id} draggableId={item.id} index={index}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                   >
//                     {item.content}
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext> 
//   );

return (
    <div className="main   box p-5">
      {" "}
      {submitedData?.images?.length ? (
        <Reorder.Group
          onDragEnd={(e) => e.stopPropagation()}
          axis="x"
          //   scrollable={true}
          values={submitedData?.images}
          onReorder={handleReorder}
          // dragListenser={false}
          dragListener={false}
          className="main grid grid-cols-6 gap-1 grid-rows-6 box p-5"
        >
          {submitedData?.images?.length
            ? submitedData?.images?.map((img, index) => (
                <ImageItemDrag
                 
                  key={img + index}
                  index={index}
                  child={<>
                    <Image
                      src={ "/girl.jpg"}
                      alt={img ? img : "/girl.jpg"}
                      className=" border   aspect-square   rounded-2xl  object-contain object-center"
                   sizes="400"
                   fill
                    /></>
                  }
                  item={img}
                />
              ))
            : null}

          <UploadFilesModal handleSubmit={HandleSubmit} />
        </Reorder.Group>
      ) : (
        <UploadFilesModal handleSubmit={HandleSubmit} />
      )}
    </div>
  );

} 