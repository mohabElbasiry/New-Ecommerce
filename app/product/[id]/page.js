"use client"
import React from "react";
import ProductContainer from "./components/productContainer";
import DynamicTable from "../../../components/GlobalUi/DynamicTable";
import { data, dataVariants, variants } from "./data";
import { generateQualities, shapeData } from "./functions/fun";

export default function EditProductPage({searchParams}) {

  // let combinedTexts = generateQualities([], variants);
  // console.log(combinedTexts);
  // const shapedData = shapeData(combinedTexts);
  return (
    <div>
      {/* <ProductContainer product={dataVariants.product} searchParams={searchParams} />
 */}
      <DynamicTable data={data} />
      {/* {shapedData.map((parent) => (
        <div className="w-[90%] mx-auto" key={parent.itemIndex}>
          <h1>{parent.key}</h1>
          <div className="w-[90%] mx-auto grid gap-2">
            {parent.value.map((child) => (
              <div className="w-[90%] mx-auto" key={child.itemIndex}>
                {child.val}
              </div>
            ))}
          </div>
        </div>
      ))} */}
    </div>
  );
}
