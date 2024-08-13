import { imageBaseUrl } from "@/lib/baseUrl";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { handleUploadMedia } from "@/app/product/functions/fun";
import { useRef, useState } from "react";

export default function UploadedSingleImage({
  urlsFiles,
  setUrlsFiles,
  setSelectedFiles,
  setUploadLength,
}) {
  const click = () => {
    setUrlsFiles([]);
  };

  const inputRef = useRef(null);
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
        <DropdownMenu open={open} onClose={() => setOpen(false)}>
          <DropdownMenuTrigger onClick={() => setOpen(true)}>
            Edit
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="justify-center relative p-3">
              <input
                type="file"
                onChange={handleUploadFile}
                onFocus={(e) => e.stopPropagation()}
                className="opacity-0 absolute top-0 left-0  h-full w-full z-10"
              />
              <span>Change Image</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center p-3" onClick={click}>
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
