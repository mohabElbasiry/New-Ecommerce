import Image from "next/image";
import React, { memo } from "react";

function SlideImages({ selectedFiles, setFileData }) {
  return (
    <div className="mt-4 flex gap-4 bg-[#fafafa] shadow border p-5 rounded-lg">
      {selectedFiles.map((file, index) => (
        <div className="" key={index}>
          <div
            key={index}
            className="relative border rounded-2xl aspect-square overflow-hidden p-2 w-32"
          >
            <Image
              fill
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-full object-contain object-center"
            />
            <button
              className="absolute top-2 right-5 cursor-pointer z-[30]"
              onClick={() => {
                setFileData(file);
              }}
            >
              edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(SlideImages, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.selectedFiles) === JSON.stringify(nextProps.selectedFiles);

});
