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
 
export const ProductDetailsComponent = () => {
  const [nav, setNav] = useState("basic");
  // ['basic',Varations,Seo,Notifications]
  return (
    <div className=" w-[80%]  justify-end gap-1 p-3 ml-auto">
      <ProductNav nav={nav} setNav={setNav} />

      <div className="flex gap-3 mt-3 ml-auto ">
        {nav === "basic" && (
          <div className="container p-3 m-1 h-full w-[70%] shadow flex flex-col gap-3 ">
            {" "}
            <BasicData /> <SubCategoriesSelect /> <Inventory /> <Pricing />{" "}
            <Tags />{" "}
          </div>
        )}
    {
      nav==="Varations"&&<ProductVariation/>
    }
        <div className="w-[38%] shadow p-2 flex flex-col gap-3">
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
          <div className="main">
            <Image
              src={"/girl.jpg"}
              className="w-[100%] h-[300px] object-cover object-top"
              height={400}
              width={400}
            />
          </div>
          <div className="otherImages    grid grid-cols-5 gap-1 ">
            <Image
              src={"/girl.jpg"}
              className="w-[100px] h-[100px] rounded-md object-cover object-top"
              height={400}
              width={400}
            />
            <Image
              src={"/girl.jpg"}
              className="w-[100px] h-[100px] rounded-md object-cover object-top"
              height={400}
              width={400}
            />
            <Image
              src={"/girl.jpg"}
              className="w-[100px] h-[100px] rounded-md object-cover object-top"
              height={400}
              width={400}
            />
            <Image
              src={"/girl.jpg"}
              className="w-[100px] h-[100px] rounded-md object-cover object-top"
              height={400}
              width={400}
            />
            <Image
              src={"/girl.jpg"}
              className="w-[100px] h-[100px] rounded-md object-cover object-top"
              height={400}
              width={400}
            />
            <Image
              src={"/girl.jpg"}
              className="w-[100px] h-[100px] rounded-md object-cover object-top"
              height={400}
              width={400}
            />
            <Image
              src={"/girl.jpg"}
              className="w-[100px] h-[100px] rounded-md object-cover object-top"
              height={400}
              width={400}
            />
            <Image
              src={"/girl.jpg"}
              className="w-[100px] h-[100px] rounded-md object-cover object-top"
              height={400}
              width={400}
            />
            <div className="border border-[#eee] rounded-lg w-[100px] h-[100px] font-medium  cursor-pointer flex items-center justify-center size-5     p-3">
              <img className="w-[30px]" src="/upload-svgrepo-com.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
