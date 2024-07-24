import UploadFile from "@/app/product/components/UploadFile";
import { Dialog, DialogContent, DialogTrigger,DialogClose } from "@/components/ui/dialog";
import { produce } from "immer";
import Image from "next/image";

import React, { useRef, useState } from "react";

export default function UploadFilesModal({handleSubmit}) {
  const ModalClose = useRef();
  const ModalSubmit = useRef();
  const [UrlsFiles, setUrlsFiles] = useState([])
  const [UrlsFilesSelected, setUrlsFilesSelected] = useState([])
  console.log(UrlsFiles);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitedData(produce((prev)=>{
//         UrlsFiles.map(url=>) prev.images.push()
//     }));
//     setShowModal(false);
//   };
  return (
    <Dialog>
      <DialogTrigger className="border w-[30px border-[#eee] rounded-lg w-[100px] h-[100px] font-medium  cursor-pointer flex items-center justify-center size-5     p-3">
        <img className="w-[30px]" src="/upload-svgrepo-com.svg" />
      </DialogTrigger>
      <DialogContent className="max-w-[90vw]  max-h-[90vh] w-full  h-full lg:w-[80%]  lg:h-[80%]  pt-10 flex flex-col justify-center ">
        <div className="flex-1 flex flex-col justify-center ">
          {" "}
          <UploadFile setUrlsFiles={setUrlsFiles} />
          <div className="mt-4 grid-cols-6 grid  gap-4">
        {UrlsFiles.map((fileUrl, index) => (
          <div className="" key={index}>
            <div
              key={index}
              className="relative border rounded-2xl aspect-square  overflow-hidden p-2"
            >
              <input className="absolute top-2 left-3 z-10" type="checkbox" onChange={(e)=> e.target.checked?
               setUrlsFilesSelected(produce((prev)=>{ prev.push(fileUrl)  })):  setUrlsFilesSelected(produce((prev)=>{ prev.filter(url=>  url!=fileUrl)  }))} />
              <Image
                fill
                src={fileUrl}
                alt={fileUrl}
                className=" w-full object-contain object-center  "
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
        <div className="flex justify-end items-center gap-5">
          <DialogClose
            ref={ModalClose}
            className=" text-white font-medium bg-gray-800 py-3 px-6 rounded-md focus:outline-none hover:bg-gray-700"
            
          >
            Cancel
          </DialogClose>
          <button
            ref={ModalSubmit}
            className=" text-white font-medium bg-blue-500 py-3 px-6 rounded-md focus:outline-none hover:bg-blue-400"
            onClick={()=>{
                handleSubmit(UrlsFilesSelected)
                ModalClose.current.click()
                }}
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
