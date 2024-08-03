"use client";
import DraftEditor from "@/components/drafteditor/Draft";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { ProductNav } from "../productNav";
import Image from "next/image";
import { BasicData } from "./BasicInfeo";
import SubCategoriesSelect from "./categoriesWithSub";
import { Inventory } from "./inventory";
import Pricing from "./pricing";
import { useState } from "react";
import ProductVariation from "../productVariations";
import { ProductSettings } from "./productSettings";
import Seo from "./tags";
import UploadFile from "@/app/product/components/UploadFile";
import UploadFilesModal from "../productImages/UploadFilesModal";
import { produce } from "immer";
import ProductImages from "../productImages";

export const ProductDetailsComponent = ({
  submitedData,
  setSubmitedData,
  formData,
  data,
  setData,
}) => {
  return (
    <div className="    justify-end gap-1 p-3 ml-auto ">
      <div className="flex gap-3 mt-3 ml-auto  ">
        <div
          className="container p-3 m-1  w-[50%]
            overflow-auto
            flex flex-col gap-3 "
        >
          {" "}
          <BasicData
            submitedData={submitedData}
            formData={formData}
            setSubmitedData={setSubmitedData}
          />
        </div>

        <div className="w-[50%] ">
          <div className="w-[100%]   p-2 flex flex-col gap-3 ">
            <ProductSettings />
            <ProductImages
              setSubmitedData={setSubmitedData}
              images={submitedData.productDetails.images}
            />
          </div>
          <div className="w-full overflow-auto ">
            <ProductVariation
              productVarients={submitedData?.productvaritions}
              setVarients={setSubmitedData}
              data={data}
              setData={setData}
              refrenceVarient={
                submitedData?.productvaritions?.referencevarients
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
