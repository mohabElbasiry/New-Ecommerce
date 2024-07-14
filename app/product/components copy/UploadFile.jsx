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
import { Label } from "@/components/ui/label";
import { getEditorDefaults } from '@pqina/pintura';

import '@pqina/pintura/pintura.css';

import { PinturaEditor } from "@pqina/react-pintura";

// pintura
import { pintura } from "@pqina/pintura/pintura.module.css";
import { index as pinturaTheme } from "./index.module.css";

import {
  // editor
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_finetune,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_defaults,
  plugin_annotate,
  markup_editor_defaults,
} from "@pqina/pintura";

import {
  LocaleCore,
  LocaleCrop,
  LocaleFinetune,
  LocaleFilter,
  LocaleAnnotate,
  LocaleMarkupEditor,
} from "@pqina/pintura/locale/en_GB";

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

const editorDefaults = {
  utils: ["crop", "finetune", "filter", "annotate"],
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  locale: {
    ...LocaleCore,
    ...LocaleCrop,
    ...LocaleFinetune,
    ...LocaleFilter,
    ...LocaleAnnotate,
    ...LocaleMarkupEditor,
  },
};

export default function UploadFile() {
  const InputRef = useRef();
  const InputUrlsRef = useRef();
  const [uploadFiles, setUploadFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [UrlsAfterUpload, setUrlsAfterUpload] = useState([]);
  const [result, setResult] = useState("");
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
    const urls = await uploadingAssets("upload/files", uploadFiles);
    console.log("urls", urls);
    //  setUrlsAfterUpload(urls)
  };

  useEffect(() => {
    if (uploadFiles.length) handleUploadFile_2();
  }, [uploadFiles]);
  const [inlineResult, setInlineResult] = useState();


     
  function handleUploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", function (e) {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        const progressBar = document.getElementById("progressBar");
        progressBar.style.width = percentComplete + "%";
        progressBar.innerText = Math.round(percentComplete) + "%";
      }
    });

    xhr.open("POST", "upload/files"); // Replace with your server's upload endpoint
    xhr.send(formData);
  }
  return (
    <>
      <div className="max-w-screen">
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
        <div>
      <h2>Example</h2>



      {!!result.length && (
        <p>
          <img src={result} alt="" />
        </p>
      )}
    </div>
      </div>
      <div className="mt-4 grid-cols-1 grid  gap-4">
        
        {selectedFiles.map((file, index) => (
          <div className="" key={index}>
            <div
              key={index}
              className="relative border rounded-2xl aspect-square  overflow-hidden p-2"
            >
              <input className="absolute top-2 left-3 z-50" type="checkbox" />
              <div style={{ height: "70vh" }}>
        <PinturaEditor
          {...editorDefaults}
          className={`${pintura} ${pinturaTheme}`}
          src={URL.createObjectURL(file)}
          alt={file.name}
          onLoad={(res) => console.log("load image", res)}
          onProcess={({ dest }) => setResult(URL.createObjectURL(dest))}
        />
      </div>
             
              <button
                className="absolute top-2 right-5 cursor-pointer z-[30]"
                onClick={() => deleteSpecificImage(idx, file?.itemIndex)}
              >
                x
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
