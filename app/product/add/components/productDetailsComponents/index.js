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

export const ProductDetailsComponent = ({
  submitedData,
  setSubmitedData,
  formData,
  data,
  setData
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
            {/* <div className="main grid grid-cols-2 gap-1 box p-1">
              <Image
                src={"/girl.jpg"}
                className="w-[100%] h-[300px] object-cover object-top rounded-2xl"
                height={400}
                width={400}
              />
              <div
                className="otherImages 
                flex items-start justify-start gap-1 "
              >
                <Image
                  src={"/girl.jpg"}
                  className="w-[100px] 
                    h-[100px] rounded-2xl overflow-hidden object-cover
                    object-top"
                  height={400}
                  width={400}
                />

                <div className="border w-[30px border-[#eee] rounded-lg w-[100px] h-[100px] font-medium  cursor-pointer flex items-center justify-center size-5     p-3">
                  <img className="w-[30px]" src="/upload-svgrepo-com.svg" />
                </div>
              </div>
            </div> */}

               <UploadFile />
          </div>
          <div className="w-full overflow-auto ">
            {
              console.log(submitedData)
            }
            <ProductVariation
              productVarients={submitedData?.productvaritions}
              setVarients={setSubmitedData}
              data={data}
              setData={setData}
              refrenceVarient={submitedData?.productvaritions?.referencevarients}
            />

          </div>
        </div>
      </div>
    </div>
  );
};
