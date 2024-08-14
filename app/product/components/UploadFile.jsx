"use client";
import { memo, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactPhotoEditor } from "@/components/ReactPhotoEditor";
import { handleUploadMedia } from "../functions/fun";

function UploadFile({
  setUrlsFiles,
  setUrlsFilesSelected,
  setUploadLength,
  notURL,
  type,
  setSubmitedData = () => {},
}) {
  const InputRef = useRef();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [file, setFile] = useState();
  const [showModal, setShowModal] = useState(false);

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

  // const handleGetFromUrl = async () => {
  //   const url = InputUrlsRef.current.value;
  //   if (!url) return;
  //   const file = await fetchImage(url);
  //   if (file) {
  //     setSelectedFiles((prev) => [file, ...prev]);
  //   }
  // };

  // const handleFileChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   setSelectedFiles((prev) => [...files, ...prev]);
  // };

  const handleUploadFile = (e) =>
    handleUploadMedia(
      Array.from(e.target.files),
      selectedFiles,
      setSelectedFiles,
      setUrlsFiles,
      setUrlsFilesSelected,
      setUploadLength,
      undefined,
      type
    );

  // useEffect(() => {
  //   if (selectedFiles?.length) {
  //     selectedFiles.length ? handleUploadFile() : null;
  //   }
  // }, [selectedFiles]);

  return (
    <>
      <p>Image</p>
      <div className="relative  p-4 w-full  mt-4">
        {/* <div
          className="bg-gray-200 rounded-full h-2 absolute z-10 inset-x-0 top-1 left-0  hidden"
          ref={progressBarParent}
        >
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 "
            ref={progressBar}
            style={{ width: "0%" }}
          ></div>
        </div> */}
        {/* {selectedFiles.length ? (
          <Button
            type="button"
            className="absolute  z-50 right-5  top-5 !mx-auto"
            onClick={handleUploadFile}
          >
            Upload
          </Button>
        ) : null} */}
        <label className="relative flex justify-center items-center flex-col gap-6 w-full  h-44 px-4  transition bg-white border-2  border-dashed border-black rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          <span className="flex justify-center items-center gap-3">
            <button
              type="button"
              className="z-0 bg-white shadow-2xl  p-2 px-4 text-sm text-gray-600 border rounded-xl"
            >
              Add media
            </button>

            <Popover className="[z-index:999]">
              {!notURL ? (
                <PopoverTrigger className="text-gray-600 text-sm [z-index:999]">
                  Add from URL
                </PopoverTrigger>
              ) : null}
              <PopoverContent className="text-grey-600 text-sm [z-index:999]">
                <h4 className="font-[600]">Add media from URL</h4>
                <div className="my-4">
                  <label>Image, YouTube, or Vimeo URL</label>
                  <div className="flex flex-col gap-3 items-start">
                    <input
                      type="text"
                      placeholder="https://"
                      className="border outline-none w-full"
                    />
                  </div>
                  <button className="bg-[red]">add file</button>
                </div>
              </PopoverContent>
            </Popover>
          </span>
          <span className="flex items-center space-x-2 text-gray-400 text-sm">
            Drag and drop images, videos, and files
          </span>
          <input
            type="file"
            name="file_upload"
            ref={InputRef}
            accept="image/*,video/*"
            multiple={type === "single" ? false : true}
            className="opacity-0 absolute top-0 left-0 z-[3] w-full h-full cursor-pointer "
            onChange={handleUploadFile}
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
    </>
  );
}
export default memo(UploadFile);
