"use client";
import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

// Using dynamic import of Jodit component as it can't render on server side
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function TextEditor({ content, setContent }) {
  const editor = useRef(null);


  // Custom configuration for Jodit editor
  const config = useMemo(
    () => ({
      // Customize toolbar buttons
      buttons: [
        "paragraph", "|", "bold", "italic", "underline", "|", "align", "link", "image", "|", "indent", "outdent", "ol", "ul"
      ],
      // Remove specific buttons
      removeButtons: [
         "font", "strikethrough", "eraser", "spellcheck", "speechRecognize", "table", "hr", "fullsize", "symbols", "ai-commands", "ai-assistant", "brush"
      ],
      // Custom image uploader configuration
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"]
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
    setContent(value);
  };

  return (
    <div className="h-full w-full ">
      {/* Main initialization of the Jodit editor */}
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={handleChange}
        className="w-full h-full bg-white min-w-[300px]"
      />
      <style>{`.jodit-wysiwyg { height: 300px !important; }`}</style>
    </div>
  );
}
