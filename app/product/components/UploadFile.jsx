"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ReactPhotoEditor } from "@/components/ReactPhotoEditor";
import { fetchImage } from "../functions/fun";
import { PopoverClose } from "@radix-ui/react-popover";

export default function UploadFile() {
  const InputRef = useRef();
  const InputUrlsRef = useRef();
  const progressBar = useRef();
  const progressBarParent = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [file, setFile] = useState();
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    if (file) {
      setShowModal(true);
    }
  };

  const hideModal = () => {
    setShowModal(false);
    setFile();
  };

  const handleSaveImage = (editedFile) => {
    setSelectedFiles((prev) => [
      ...prev.map((file) =>
        file.name === editedFile.name ? editedFile : file
      ),
    ]);
    setFile(editedFile);
  };

  const setFileData = (file) => {
    if (file) {
      setFile(file);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    setSelectedFiles((prev) => [...files, ...prev]);
  };

  const handleGetFromUrl = async () => {
    const url = InputUrlsRef.current.value;
    if (!url) return;
    const file = await fetchImage(url);
    if (file) {
      setSelectedFiles((prev) => [file, ...prev]);
    }
  };

  const handleUploadFile = () =>
    UploadFile(selectedFiles, progressBarParent, progressBar);

  return (
    <>
      <div className="max-w-screen relative  ">
        <div
          className="bg-gray-200 rounded-full h-2 absolute z-10 inset-x-0 top-1 left-0  hidden"
          ref={progressBarParent}
        >
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 "
            ref={progressBar}
            style={{ width: "0%" }}
          ></div>
        </div>
        {selectedFiles.length ? (
          <Button
            type="button"
            className="absolute  z-50 right-5  top-5 !mx-auto"
            onClick={handleUploadFile}
          >
            Upload
          </Button>
        ) : null}
        <label className=" relative flex justify-center items-center flex-col gap-10 w-full  h-44 px-4 shadow-md transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          <span className="flex justify-center items-center gap-5  bg-white ">
            <button
              type="button"
              className="z-50 bg-white  p-2 px-4 shadow border rounded-xl"
              onClick={() => InputRef.current.click()}
            >
              Add media
            </button>
            <Popover className="z-50">
              <PopoverTrigger className="z-50" asChild>
                <Button className="z-50" variant="ghost">
                  URL from Add
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium leading-none">
                      Add media from URL
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Image, or Vimeo URL
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-1 items-center gap-4">
                      <input
                        ref={InputUrlsRef}
                        type="url"
                        placeholder="https://"
                        defaultValue="https://"
                        className="p-2 border rounded-xl h-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-5  items-center ">
                    {" "}
                    <Button
                      className="flex-1 p-4 px-2"
                      onClick={handleGetFromUrl}
                    >
                      {" "}
                      Add file
                    </Button>
                    <PopoverClose className="flex-1">
                      <Button className="w-full p-4 px-2" variant="outline">
                        {" "}
                        Close
                      </Button>
                    </PopoverClose>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </span>
          <span className="flex items-center space-x-2">
            Drag and drop images, videos, and files
          </span>
          <input
            type="file"
            name="file_upload"
            ref={InputRef}
            multiple
            className="opacity-0 absolute top-0 left-0 z-[3] w-full h-full cursor-pointer "
            onChange={handleFileChange}
          />
        </label>
      </div>
      <ReactPhotoEditor
        open={showModal}
        onClose={hideModal}
        file={file}
        onSaveImage={handleSaveImage}
        selectedFiles={selectedFiles}
        setFileData={setFileData}
      />
      <div className="mt-4 grid-cols-6 grid  gap-4">
        {selectedFiles.map((file, index) => (
          <div className="" key={index}>
            <div
              key={index}
              className="relative border rounded-2xl aspect-square  overflow-hidden p-2"
            >
              <input className="absolute top-2 left-3 z-10" type="checkbox" />
              <Image
                fill
                src={URL.createObjectURL(file)}
                alt={file.name}
                className=" w-full object-contain object-center  "
              />
              <button
                className="absolute top-2 right-5 cursor-pointer z-[30]"
                onClick={() => {
                  setFileData(file);
                  showModalHandler();
                }}
              >
                edit
              </button>
            </div>
            <p className="mt-2 text-center text-sm">{file.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
