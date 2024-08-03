import UploadFile from "@/app/product/components/UploadFile";
import { CustomDialoge } from "@/components/Modal";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { getOperation, imageBaseUrl } from "@/lib/apiUtils";
import { produce } from "immer";
import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";

export default function UploadFilesModal({ handleSubmit }) {
  const ModalClose = useRef();
  const ModalSubmit = useRef();
  const [UrlsFiles, setUrlsFiles] = useState([]);
  const [UrlsFilesSelected, setUrlsFilesSelected] = useState([]);
  console.log(UrlsFiles);
  const [open, setOpen] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSubmitedData(produce((prev)=>{
  //       UrlsFiles.map(url=> prev.images.push())
  //   }));
  //   setShowModal(false);
  // };
  useEffect(() => {
    const fetchAllFiles = async () => {
      if (open) {
        const data = await getOperation(`/upload`, {
          method: "GET",
          headers: {
            token: true,
          },
        });
        console.log("data?.data", data?.data);
        if (data?.data?.length) {
          setUrlsFiles(data.data);
        }
      } else {
        setUrlsFiles(data.data);
      }
    };
    fetchAllFiles();
  }, [open]);

  console.log("openopenopenopen", open);
  console.log("UrlsFilesSelected", UrlsFilesSelected);
  return (
    <>
      {" "}
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="border w-[30px border-[#eee] rounded-lg w-[100px] h-[100px] font-medium  cursor-pointer flex items-center justify-center size-5     p-3"
      >
        <img className="w-[30px]" src="/upload-svgrepo-com.svg" />
      </button>
      <CustomDialoge open={open} setOpen={setOpen}>
        <div className="bg-[white] shadow-2xl h-[75vh] w-[75vw]  ">
          <div className="flex-1 flex flex-col justify-center">
            {" "}
            <UploadFile setUrlsFiles={setUrlsFiles} />
            <div className="mt-4 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 grid gap-4 h-[47vh] overflow-y-scroll scrollbar-styling">
              {UrlsFiles.map((fileUrl, index) => (
                <div
                  className="bg-transparent [&:hover>div]:bg-[#F1F1F1] "
                  key={index}
                >
                  <div
                    key={index}
                    className="relative rounded-2xl aspect-square   h-[150px] w-[150px] !p-5 !flex !items-center !justify-center mx-auto"
                    checked={UrlsFilesSelected?.find(
                      (sel) => sel._id === fileUrl._id
                    )}
                    onChange={(e) => {
                      const existed = UrlsFilesSelected?.find(
                        (sel) => sel._id === fileUrl._id
                      );
                      !existed
                        ? setUrlsFilesSelected((prev) => [...prev, fileUrl])
                        : setUrlsFilesSelected((prev) =>
                            prev.filter((url) => url._id != fileUrl._id)
                          );
                    }}
                  >
                    <input
                      className="absolute top-2 left-3 z-10 cursor-pointer"
                      type="checkbox"
                      // onChange={(e) =>
                      //   !e.target.checked
                      //     ? setUrlsFilesSelected(
                      //         produce((prev) => {
                      //           prev.push(fileUrl);
                      //         })
                      //       )
                      //     : setUrlsFilesSelected((prev) =>
                      //         prev.filter((url) => url._id != fileUrl._id)
                      //       )
                      // }
                    />
                    <Image
                      fill
                      src={`${imageBaseUrl}/${fileUrl.filename}`}
                      alt={fileUrl.filename}
                      className="object-contain object-center !w-[80%] !h-[80%] mt-[10%] mx-auto border-3 border-[gray] rounded"
                    />
                    {/* <button
                className="absolute top-2 right-5 cursor-pointer z-[30]"
                // onClick={() => {
                //   setFileUrlData(fileUrl);
                //   showModalHandler();
                // }}
              >
                edit
              </button> */}
                  </div>
                  {/* <p className="mt-2 text-center text-sm">{file}</p> */}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end items-center gap-5 absolute bottom-0 border-t shadow-2xl p-3 left-1/2 w-[98%] -translate-x-1/2">
            <button
              onClick={() => setOpen(!open)}
              className=" text-white font-medium bg-gray-800 text-sm py-2 px-3 rounded-md focus:outline-none hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              className=" text-white font-medium bg-blue-500 text-sm py-2 px-3 rounded-md focus:outline-none hover:bg-blue-400"
              onClick={() => {
                handleSubmit(UrlsFilesSelected);
                setOpen(!open);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </CustomDialoge>
    </>
  );
}
