import { TooltipF } from "@/components/ToolTipCostom";
import { useCallback, useEffect, useState } from "react";

export const ProductMangeBar = ({  history, setSubmitedData }) => {
  const [index, setIndex] = useState(0);
  const currentState = history?.[index];

  const UpdateState = (newIndex) => {
    console.log("newIndex", newIndex);
    setSubmitedData({ ...history[newIndex], history });
  };

  useEffect(() => {
    // This effect runs only when you intentionally want to update the history.
    if (index !== history?.length - 1) {
      setIndex(history.length - 1);
    }
    if(!history.length){
 
    }
  }, [history]);

  const undo = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      UpdateState(newIndex);
    }
  };

  const redo = () => {
    if (index < history.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      UpdateState(newIndex);
    }
  };

  return (
    <div
      className=" 
      flex items-start
          "
    >
       <div className="flex items-center  ">
        <TooltipF text={"Undo"}>
          <button
            type="button"
            onClick={undo}
            disabled={index === 0}
            className="disabled:bg-red-200"
          >
            <img
              src="/producticons/undo.svg"
              className=" w-[40px] h-[30px] cursor-pointer  mx-2 rounded p-[5px] bg-[#eee]"
              width={30}
              height={30}
            />
          </button>
        </TooltipF>
    
        <TooltipF text={"Redo"}>
          <button
            type="button"
            disabled={index === history?.length-1}
            onClick={redo}
            className="disabled:"
          >
            <img
              src="/producticons/redo.svg"
              className="    w-[40px] h-[30px]
               cursor-pointer  mx-2 rounded p-[5px] bg-[#eee]"
              width={30}
              height={30}
            />
          </button>
        </TooltipF>
      </div>
      <div className="flex gap-3">
        <button
          className="bg-[#eee] p-2 rounded-md 
        h-[30px] text-sm  capitalize flex items-center
         text-black hover:bg-[#fff] hover:text-black"
          type="button"
        >
          discard
        </button>
        <button
          className="bg-[#333] p-2 rounded-md 
        h-[30px] text-sm  capitalize flex items-center text-white hover:bg-[#fff] hover:text-black"
          type="button"
        >
          Save
        </button>
      </div>
     
    </div>
  );
};
