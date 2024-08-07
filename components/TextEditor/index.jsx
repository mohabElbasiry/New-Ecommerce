"use client";
import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { produce } from "immer";
import { UpdateAction } from "@/app/product/add/components/productVariations/RootFunction/middleWare";

// Using dynamic import of Jodit component as it can't render on server side
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function TextEditor({ content, setSubmitedData }) {
  const editor = useRef(null);

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
      disablePlugins: ["video", "file", "preview", "print"],
      // Add custom buttons
      // extraButtons: [customButton]
    }),
    []
  );

  // Function to handle changes in the editor
  const handleChange = (value) => {
    const action = {
      type: "UpdatePropertyByNameAndValue",
      payload: { name: "description_en", value: value },
      target: "productDetails",
    };
    UpdateAction(action, setSubmitedData);
  };

  return (
    <div className="h-full">
      {/* Main initialization of the Jodit editor */}
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={handleChange}
        className="w-full h-full bg-white min-w-[600px]"
      />
      <style>{`.jodit-wysiwyg { height: 200px !important; 
        display:flex;flex-wrap:no-wrap
      }`}</style>
    </div>
  );
}
