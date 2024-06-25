import React from "react";

export default function Headercomponent() {
  return (
    <div className=" h-[50px] items-center flex justify-between border border-[#ddd]  px-3 py-4  ">
      <h1 className=" font-semibold pl-3 capitalize">Add Product</h1>
      <div className="flex">
        <div className="icons flex  gap-5">
          <img src={"/left.svg"} className="w-[20px]      " />
          <img src={"/right.svg"} className="w-[20px]      " />
        </div>
        <button className="   p-1 w-[100px] ml-auto text-black rounded-md">
          Save
        </button>
      </div>
    </div>
  );
}
