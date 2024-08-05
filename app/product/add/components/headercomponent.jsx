import { TooltipF } from "@/components/ToolTipCostom";
import React from "react";

export default function Headercomponent({ handleSubmit, children,submittedData }) {
  const SubmittingData = (data) => {
    console.log(data,submittedData, "sdubmittied Dataffffffffffffffffffff");
  };

  return (
    <form onSubmit={handleSubmit(SubmittingData)}>
      <div className="  flex justify-between sticky top-0   bg-[#f4f7f6]  z-[20]  px-3 py-4  ">
     <div>
     <h1 className=" text-xl  pl-3 capitalize">Add Product</h1>
        <p className=" text-sm  pl-3 capitalize title">Dashboard/Add Product</p>
     </div>
       


     <div className=" sticky top-0  flex justify-end  ">
        <div className="flex w-full items-center">
          <div className="  flex  gap-5">
            <img src={"/left.svg"} className="w-[20px]      " />
            <img src={"/right.svg"} className="w-[20px]      " />
          </div>
          <button
            className="
             p-1 w-[100px] ml-auto text-black rounded-md"
            type="submit"
          >
            Save
          </button>

    <TooltipF text={<div className="p-3">
      
      saddsa
    </div>}>

          <img src="/producticons/column.svg"
          className=" w-[20px] h-[20px]"
          width={30} height={30}/>
    </TooltipF>
        </div>
       
        </div>
      </div>
      {children}
    </form>
  );
}
