"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { uploadingAssets } from "../functions/fun";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ReactPhotoEditor } from "@/components/ReactPhotoEditor"; 
async function fetchImage(url) {
  try {
      // Fetch the image from the URL
      const response = await fetch(url);
      
      // Check if the fetch was successful
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      
      // Convert the response to a Blob (binary large object)
      const blob = await response.blob();
      
      // Create an object URL from the Blob
      const objectURL = URL.createObjectURL(blob);
      
      // Create an Image element
      const img = document.createElement('img');
      img.src = objectURL;
      
      // Append the image to the body (or any other element)
      document.body.appendChild(img);
      
      // If you need the binary data, you can use a FileReader to read the Blob
      const reader = new FileReader();
      reader.onload = function() {
          const arrayBuffer = reader.result;
          // Do something with the arrayBuffer, such as converting to base64
          const base64String = btoa(
              new Uint8Array(arrayBuffer)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          console.log(base64String); // The base64 representation of the image
      };
      reader.readAsArrayBuffer(blob);
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}

// URL of the image file
const imageUrlCustom = 'https://imagecdn.prod.floward.com/web/Files/thumPro/47b4c4a4-1b9a-45d5-91bd-a1f5adebb96e.jpg?w=600&auto=format';

// Fetch and display the image


export default function UploadFile() {
  // fetchImage(imageUrlCustom);
  const InputRef = useRef();
  const InputUrlsRef = useRef();
  const progressBar = useRef();
  const [uploadFiles, setUploadFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [UrlsAfterUpload, setUrlsAfterUpload] = useState([]);
  const [file, setFile] = useState()
  const [showModal, setShowModal] = useState(false)
  // Show modal if file is selected
  const showModalHandler = () => {
    if (file) {
      setShowModal(true)
    }
  }

  // Hide modal
  const hideModal = () => {
    setShowModal(false)
    setFile()
  }

  // Save edited image
  const handleSaveImage = (editedFile) => {

    setSelectedFiles((prev) =>{
      // console.log();
      return  [...prev.map(file =>file.name===editedFile.name?editedFile:file)]
    });
    setFile(editedFile);
  };

  const setFileData = (file) => {
    if (file ) {
      setFile(file)
    }
  }


  const handleFileChange = (event) => {
   
    const files = Array.from(event.target.files);
    setUploadFiles(files);
    setSelectedFiles((prev) => [...files, ...prev]);
  };

  const handleGetFromUrl = (event) => {
    const url = InputUrlsRef.current.value;
    if (!url) return;
    setUrlsAfterUpload((prev) =>[url, ...prev]);
    // setUploadFiles(file)
    // setSelectedFiles((prev) => [...file, ...prev]);
  };
  const handleUploadFile_2 = async () => {
    const urls = await uploadingAssets("upload/file", selectedFiles[0]);
    console.log("urls", urls);
    //  setUrlsAfterUpload(urls)
  };

  useEffect(() => {
    // if (uploadFiles.length)
      //  handleUploadFile_2();
// if(file)showModalHandler()
  console.log("redender");
  }, [uploadFiles,file]);

  function handleUploadFile() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTYzYzdiYzg2MjI2MjU1M2JkYjYwNyIsImNyZWF0ZWRBdCI6MTcyMTEyMTkxNTkwNSwiaWF0IjoxNzIxMTIxOTE1LCJleHAiOjE3Mjg4OTc5MTV9.E4-W-T_Dyyyyh9kX7eaSn5QhUtxmy4ZmF3ZAeaRlFeo";
    const headers = `Bearer ${token}`;
    const file = selectedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
  
    const xhr = new XMLHttpRequest();
  
    xhr.upload.addEventListener("progress", function (e) {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        console.log("percentComplete", percentComplete);
        // const progressBar = document.getElementById("progressBar");
         progressBar.current.style.width = percentComplete + "%";
        // progressBar.innerText = Math.round(percentComplete) + "%";
      }
    });
  
    xhr.open("POST", "upload/file"); // Replace with your server's upload endpoint
    xhr.setRequestHeader("Authorization", headers);
    xhr.send(formData);
  }
  return (
    <>
      <div className="max-w-screen relative border ">
      <div className="bg-gray-200 rounded-full h-2 absolute z-10 inset-x-0 top-1 left-0">
            <div className="bg-blue-600 h-2 rounded-full" ref={progressBar} style={{width:"0%"}}></div>
        </div>
{selectedFiles.length? <Button type="button" className="absolute  z-50 right-5  top-5 !mx-auto" onClick={handleUploadFile}>Upload</Button>:null}
        <label className=" relative flex justify-center items-center flex-col gap-10 w-full  h-44 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
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
                  {" "}
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
                  <Button
                    className="w-auto p-4 px-2"
                    onClick={handleGetFromUrl}
                  >
                    {" "}
                    Add file
                  </Button>
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
                onClick={() => { setFileData(file)
                showModalHandler()
               }}
              >
               edit 
              </button>
            </div>
            <p className="mt-2 text-center text-sm">{file.name}</p>
          </div>
        ))}
        {UrlsAfterUpload.map((url, index) => (
          <div className="" key={index}>
            <div
              key={index}
              className="relative border rounded-2xl aspect-square  overflow-hidden p-2"
            >
              <input className="absolute top-2 left-3 z-50" type="checkbox" />
              <img
                fill
                src={url}
                alt={url}
                className=" w-full h-full object-contain object-center  "
              />
              <button
                className="absolute top-2 right-5 cursor-pointer z-[30]"
                onClick={() => deleteSpecificImage(idx, item?.itemIndex)}
              >
                x
              </button>
            </div>
            {/* <p className="mt-2 text-center text-sm">{file.name}</p> */}
          </div>
        ))} 
      
      </div>
    </>
  );
}
