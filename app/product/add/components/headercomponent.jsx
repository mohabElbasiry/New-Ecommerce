import React from "react";

export default function Headercomponent({ handleSubmit, children,submittedData }) {
  const SubmittingData = (data) => {
    console.log(data,submittedData, "sdubmittied Dataffffffffffffffffffff");
  };
  return (
    <form onSubmit={handleSubmit(SubmittingData)}>
      <div className=" h-[50px] items-center flex justify-between  sticky top-0 bg-[#f4f7f6]  px-3 py-4  ">
        <h1 className=" font-semibold pl-3 capitalize">Add Product</h1>
        <div className="flex">
          <div className="icons flex  gap-5">
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
        </div>
      </div>
      {children}
    </form>
  );
}
