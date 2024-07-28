import Image from "next/image";
import React, { useEffect, useState } from "react";
import UploadFilesModal from "./UploadFilesModal";
import { produce } from "immer";
import { cn } from "@/lib/utils";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DragableImagesBox } from "./dragableImages";

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
      'garbo-2_1_1024x1024@2x.jpg-1719226961933.jpeg', 
      'garbo_2_02e56fa5-0650-4c36-b672-aed523ac42f9_1024x1024@2x.webp-1719226962460.webp',
    
      'garbo_1_3a9383ad-c13d-44da-942a-7c51dcc6955e_1024x1024@2x.webp-1719226962604.webp',
    'garbo_2_1_1_1024x1024@2x.webp-1719226962713.webp'
  ];
    handleReorder(urls);
  }, []);

 
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(submitedData.images);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    handleReorder(reorderedItems);
  };

  return (
    <div className="">

      <DragableImagesBox/>
    </div>
  );
}
