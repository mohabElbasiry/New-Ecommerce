"use client";
import DraftEditor from "@/components/drafteditor/Draft";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { ProductNav } from "../productNav";
import Image from "next/image";
import { BasicData } from "./BasicInfeo";
import SubCategoriesSelect from "./categoriesWithSub";
import { Inventory } from "./inventory";
import Pricing from "./pricing";
import Tags from "./tags";
import { useState } from "react";
import { ProductVariation } from "../productVariations";

export const ProductDetailsComponent = ({ submitedData, setSubmitedData }) => {
  const [nav, setNav] = useState("basic");
  // ['basic',Varations,Seo,Notifications]
  return (
    <div className=" w-[80%]  justify-end gap-1 p-3 ml-auto]">
      {/* <ProductNav nav={nav} setNav={setNav} /> */}

      <div className="flex gap-3 mt-3 ml-auto  ">
        {nav === "basic" && (
          <div
            className="container p-3 m-1  w-[60%]
            overflow-auto
            flex flex-col gap-3 "
          >
            {" "}
            <div className="w-[100%] shadow p-2 flex flex-col gap-3 ">
              <p className="font-medium">Visablility</p>

              <InputWithLabelComponent
                Input={false}
                selectArray={["hello", "dummy"]}
                inputCss="w-[100%]"
              />
              <InputWithLabelComponent
                label="Publish Date"
                PlaceHolder="Add product name"
                Input
                inputType="date"
              />
              <div className="main grid grid-cols-2 gap-1">
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
              </div>
            </div>
            <BasicData submitedData={submitedData} /> <Tags />{" "}
          </div>
        )}
        {/* {nav === "Varations" && (
          <ProductVariation
            submitedData={submitedData}
            setSubmitedData={setSubmitedData}
          />
        )} */}
        <div className=" ">
          <div className="w-full overflow-auto ">
            <ProductVariation
              submitedData={submitedData}
              setSubmitedData={setSubmitedData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
