import { imageBaseUrl } from "@/lib/baseUrl";
import Image from "next/image";

import { handleUploadMedia } from "@/app/product/functions/fun";
import { useRef, useState } from "react";
import DropDown from "./DropDown";

export default function UploadedSingleImage({
  urlsFiles,
  setUrlsFiles,
  setSelectedFiles,
  setUploadLength,
}) {
  const removeUploadedImage = () => {
    setUrlsFiles([]);
  };

  const [open, setOpen] = useState(false);
  const handleUploadFile = (e) =>
    handleUploadMedia(
      e.target.files,
      urlsFiles,
      setSelectedFiles,
      setUrlsFiles,
      undefined,
      setUploadLength,
      setOpen,
      "single",
    );

  return (
    <>
      <div className="flex justify-between">
        <p>Image</p>
        <DropDown
          open={open}
          setOpen={setOpen}
          handleUploadFile={handleUploadFile}
          removeUploadedImage={removeUploadedImage}
        />
      </div>
      <Image
        src={`${imageBaseUrl}/${urlsFiles?.[0]?.filename || ""}`}
        alt={`${urlsFiles?.[0]?.filename}`}
        height={100}
        width={100}
        className="object-contain object-center !w-full  !h-3/4 rounded mt-5"
      />
    </>
  );
}
