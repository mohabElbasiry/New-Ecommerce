import { TooltipF } from "@/components/ToolTipCostom";
import React from "react";
import { ProductMangeBar } from "./bottombar";

export default function Headercomponent({
  handleSubmit,
  children,
   hsitory,
   setSubmitedData
}) {
  const SubmittingData = (data) => {
    console.log(data, submittedData, "sdubmittied Dataffffffffffffffffffff");
  };

  return (
    <form onSubmit={handleSubmit(SubmittingData)}>
      <div className="  flex justify-between sticky top-0   bg-[#f4f7f6]  z-[20]  px-3 py-4  ">
        <div>
          <h1 className=" text-xl  pl-3 capitalize">Add Product</h1>
          <p className=" text-sm  pl-3 capitalize title">
            Dashboard/Add Product
          </p>
        </div>

        <ProductMangeBar
           history={hsitory}
          setSubmitedData={setSubmitedData}
        />
      </div>
      {children}
    </form>
  );
}
