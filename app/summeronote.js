"use client";
import Script from "next/script";
import { useEffect, useRef } from "react";

export const Summernote = () => {
    const onChange=(cc)=>{
        console.log(cc,'cc');
    }
  const ref = useRef();
  useEffect(() => {
    $("#summernote").summernote({
      placeholder: "Hello stand alone ui",
      tabsize: 2,
      height: 120,
      lang: "ar",
      toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "underline", "clear"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["table", ["table"]],
        ["insert", ["link", "picture", "video"]],
        ["view", ["fullscreen", "codeview", "help"]],
      ],
      onchange: (content) => {
        onChange(content)
      },
    });

    return () => $("#summernote").summernote("destroy");
  }, [ref]);
  return (
    <>
      <div id="summernote" ref={ref}></div>
    </>
  );
};
