"use client";
import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
 import "./index.css";
  
// Using dynamic import of Jodit component as it can't render on server side
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function TextEditor({ 
  content, name,handleChange }) {
  const editor = useRef(null);
    console.log(  content,'dsaaaaaaaaaaaaaaaaaaaaaaa');
 
  // Custom configuration for Jodit editor
  const config = useMemo(
    () => ({
      // Customize toolbar buttons
      // buttons: [
      //   "paragraph", "bold", "italic", "underline",

      // ],
      // Remove specific buttons
      //     removeButtons: [
      //       "spellcheck", "speechRecognize", "table", "hr",
      // "ai-assistant", "brush"
      //     ],
      // Custom image uploader configuration
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
      // Disable unwanted plugins
      disablePlugins: ["video", "file", "preview"],
      // Add custom buttons
      // extraButtons: [customButton]
    }),
    []
  );

  // Function to handle changes in the editor
  
   return (
    <div className="h-full">
      {/* Main initialization of the Jodit editor */}
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={(newvalue)=>{
          console.log('object');
            handleChange(newvalue,name)
        }}
        name={name}
        className="w-full h-full bg-white min-w-[300px]"
      />
      <style>{`.jodit-wysiwyg { height: 150px !important; 
        display:flex;flex-wrap:no-wrap
      }`}</style>
    </div>
  );
}
