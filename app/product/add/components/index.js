"use client";
import Headercomponent from "./headercomponent";
import { ProductDetailsComponent } from "./productDetailsComponents";

export const ProductAddMaim = () => {
  return (
    <>
      <Headercomponent />
      <div className="flex items-center gap-2">
        <ProductDetailsComponent />
      </div>
    </>
  );
};
