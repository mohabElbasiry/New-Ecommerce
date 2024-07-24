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
import UploadFilesModal from "./UploadFilesModal";
import { produce } from "immer";

export const ProductDetailsComponent = ({
  submitedData,
  setSubmitedData,
  formData,
  data,
  setData,
}) => {
  const HandleSubmit = (images) => {
    console.log(images);
    setSubmitedData(
      produce((prev) => {
        if (!prev.images) {
          prev.images = [];
        }
        images.forEach(image => {
          if (!prev.images.some(existingImage => existingImage === image)) {
            prev.images.push(image);
          }
        });
      })
    );
  };
  
  return (
    <div className="    justify-end gap-1 p-3 ml-auto]">
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
            <div className="main grid grid-cols-2 gap-1 box p-5">

        
             {submitedData?.images?.[0]? <Image
                src={submitedData?.images?.length?submitedData?.images?.[0]:"/girl.jpg"||"/girl.jpg"}
                className="w-[100%] h-[300px] object-cover object-top rounded-2xl border      "
                alt={submitedData?.images?.length?submitedData?.images?.[0]:"/girl.jpg"}
                height={400}
                width={400}
              />:null}
              <div
                className="otherImages 
                flex items-start justify-start gap-1 flex-wrap "
              >   
               {submitedData?.images?.length?submitedData?.images?.map((img,index)=>
                index==0?null: 
                   <Image key={img + index}  src={img?img:"/girl.jpg"}  alt={img?img:"/girl.jpg"}
                  className="w-[100px] border     h-[100px] rounded-2xl overflow-hidden object-cover object-top"
                  height={400}
                  width={400}
                /> 
                ):null}
               

                <UploadFilesModal handleSubmit={HandleSubmit} />
              </div>
            </div>
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
