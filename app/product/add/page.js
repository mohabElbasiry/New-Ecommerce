import React from "react";
import Headercomponent from "./components/headercomponent";
import { ProductDetailsComponent } from "./components/productDetailsComponents";

export default function AddProduct() {
  return (
    <div className="bg-[#fafafa] h-[100vh] text-black flex flex-col  gap-1">
      <Headercomponent />
      <div className="flex items-center gap-2">
        <ProductDetailsComponent />
      </div>
    </div>
  );
}
