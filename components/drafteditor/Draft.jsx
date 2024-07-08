import React, { useEffect, useRef, useState } from "react";
import { ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./draft.style.css";
import draftToHtml from "draftjs-to-html";
import { stateFromHTML } from "draft-js-import-html";

const DraftEditor = (props) => {
  const _contentState = ContentState.createFromText("Sample content state");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const UdateBasicInfo = (property, value, setSubmitedData) => {
    if (typeof setSubmitedData === "function") {
      setSubmitedData((prev) => ({
        ...prev,
        productDetails: {
          ...prev.productDetails,
          [property]: value,
        },
      }));
    }
  };
  // useEffect(() => {
  //   if (props.values !== "") {
  //     const contentState = stateFromHTML(props?.value);

  //     const newEditorState = EditorState.createWithContent(contentState);
  //     setEditorState(newEditorState);
  //   }
  // }, [props?.value]);

  const convertToHtml = (isBluered = true, e) => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const html = draftToHtml(contentRaw);
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent;
     if (textContent.trim() === "") {
      if (isBluered) {
        props.setError(props?.property, "required");
      }
      return;
    }
    props.clearErrors(props?.property, "required");
    props.setValue(`${props?.property}`, html);
    if (!isBluered&&isSubmitting) {
      props.onChange(
        UdateBasicInfo(props?.property, html, props.setSubmitedData)
      );
    }
  };
  
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium capitalize">{props?.field}</p>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName={`wrapper-class wrapper-class-white  ${
          props?.error ? "error" : ""
        }`}
        editorClassName="editor-class "
        onChange={(e) => convertToHtml(false, e)}
        id={props?.id}
        name={props.property}
        onBlur={(e) => convertToHtml(true, e)}
        placeholder={props?.lang === "en" ? "Write here..." : "أكتب هنا..."}
      ></Editor>

      {props?.error ? (
        <p className="text-red-600 text-sm">{props?.message}</p>
      ) : null}
      <p></p>
    </div>
  );
};

export default DraftEditor;
