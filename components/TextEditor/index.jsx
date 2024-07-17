"use client";
import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

/* Using dynamic import of Jodit component as it can't render in server side*/
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function TextEditor({ content, setContent }) {
  const editor = useRef(null); //declared a null value
  //   const [content, setContent] = useState("Worlds best html page"); //declare using state

  /* The most important point*/
  const config = useMemo(
    //  Using of useMemo while make custom configuration is strictly recomended
    () => ({
      //  if you don't use it the editor will lose focus every time when you make any change to the editor, even an addition of one character
      /* Custom image uploader button configuretion to accept image and convert it to base64 format */
      // Hide specific buttons

      // Custom image uploader configuration
      buttons: [
        "paragraph",
        "link",
        "image",
        "indent",
        "outdent",
        "align",
        "bold",
        "italic",
        "underline",
        "ul",
        "ol",
      ],
      toolbarButtonSize: "large",
      removeButtons: [
        "color",
        "font",
        "strikethrough",
        "eraser",
        "spellcheck",
        "speechRecognize",
        "table",
        "hr",
        "fullsize",
        "symbols",
        "ai-commands",
        "ai-assistant",
        "brush",
      ],
      // Custom image uploader configuration
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
      extraIcons: {
        brush: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
     <circle cx="50" cy="50" r="50" />
   </svg>`,
      },
      // extraButtons: [],
      // Remove or disable unwanted buttons or features
      disablePlugins: ["video", "file", "preview", "print"],
    }),
    []
  );
  /* function to handle the changes in the editor */
  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div className="h-full w-full">
      {/* This is the main initialization of the Jodit editor */}
      <JoditEditor
        ref={editor} //This is important
        value={content} //This is important
        config={config} //Only use when you declare some custom configs
        onChange={handleChange} //handle the changes
        className="w-full h-full mt-10 bg-white"
      />
      <style>{`.jodit-wysiwyg{height:300px !important}`}</style>
    </div>
  );
}
