import { Reorder } from "framer-motion";
import React from "react";
import ImageItemDrag from "./ImageItemDrag";
import Image from "next/image";
import { cn } from "@/lib/utils";
import UploadFilesModal from "./UploadFilesModal";

export default function ImagesGroup({ submitedData, setSubmitedData }) {

  return (
    <Reorder.Group
      onDragEnd={(e) => e.stopPropagation()}
      axis="y"
      values={submitedData?.images}
      onReorder={handleReorder}
      // dragListenser={false}
      dragListener={false}
      className="main grid grid-cols-12 gap-1 box p-5"
    >
      {submitedData?.images?.length
        ? submitedData?.images?.map((img, index) => (
            <ImageItemDrag
              className={cn(index===0?" col-span-6 row-span-full "  :" col-span-2 " , "relative object-contain object-top rounded-2xl border      ")}
              key={img + index}
              child={
                <Image
                  src={img ? img : "/girl.jpg"}
                  alt={img ? img : "/girl.jpg"}
                  className="w-[100px] border     h-[100px] rounded-2xl  object-contain object-top"
                  height={400}
                  width={400}
                />
              }
              item={img}
            />
          ))
        : null}
        
       <UploadFilesModal handleSubmit={HandleSubmit} />
    </Reorder.Group>
  );
}
