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
  /*   const raw = convertToRaw(_contentState); */ // RawDraftContentState JSON
  //   const [contentState, setContentState] = useState(raw);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    if (props?.edit) {
      console.log(props?.value, "sadsadqeqe");
      // const doc = new DOMParser().parseFromString(props?.value, "text/html");
      // const textContent = doc.body.textContent;
      // const contentState = ContentState.createFromText(textContent);
      // const newEditorState = EditorState.createWithContent(contentState);
      const contentState = stateFromHTML(props?.value);

      // Create EditorState with the converted content
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [props?.value]);

  const convertToHtml = () => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const html = draftToHtml(contentRaw);
    props?.handleChange(html);
  };
  return (
   <div className="flex flex-col gap-2">
    <p className="font-medium capitalize">
        {props?.field}
    </p>
     <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      wrapperClassName={`wrapper-class wrapper-class-white`}
      editorClassName="editor-class"
      onChange={convertToHtml}
      value={props.value}
      id={props?.id}
      placeholder={props?.lang === "en" ? "Write here..." : "أكتب هنا..."}
    //   toolbar={{
    //     options: [
    //       "inline",
    //       "blockType",
    //       "fontSize",
    //       "list",
    //       "textAlign",
    //       "history",
    //     ],
    //     inline: { inDropdown: true },
    //     list: { inDropdown: true },
    //     textAlign: { inDropdown: true },
    //     link: { inDropdown: true },
    //     history: { inDropdown: true },
    //   }}
    ></Editor>
   </div>
  );
};

export default DraftEditor;
