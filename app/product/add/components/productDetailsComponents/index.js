"use client";
import DraftEditor from "@/components/drafteditor/Draft";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { ProductNav } from "../productNav";
import Image from "next/image";

export const ProductDetailsComponent = () => {
  return (
    <div className=" w-[80%]  justify-end gap-1 p-3 ml-auto">
      <ProductNav />

      <div className="flex gap-3 mt-3 ml-auto ">
        <div className="container p-3 m-1 h-full w-[70%] shadow flex flex-col gap-3 ">
          <InputWithLabelComponent
            Input
            label="product name"
            PlaceHolder="Add product name"
          />
          <InputWithLabelComponent
            Input={false}
            selectArray={["hello", "dummy"]}
            label="product name"
            PlaceHolder="Add product name"
          />
          <DraftEditor
            field="Product Description"
            edit={false}
            handleChange={(value) => {}}
            handleBlur={() => {}}
          />

          {/* //
             subcategories */}
          <div className=" grid grid-cols-3 gap-2">
            <InputWithLabelComponent
              Input={false}
              selectArray={["hello", "dummy"]}
              label="Parent Category "
              PlaceHolder="Add product name"
              inputCss="w-[100%]"
            />
            {/* <hr className="w-[100px]  bg-black" /> */}

            <InputWithLabelComponent
              Input={false}
              selectArray={["hello", "dummy"]}
              label="Category"
              PlaceHolder="Add product name"
              inputCss="w-[100%]"
            />

            {/* <hr className="w-[100px]  bg-black" /> */}
            <InputWithLabelComponent
              Input={false}
              selectArray={["hello", "dummy"]}
              label="Sub Category"
              PlaceHolder="Add product name"
              inputCss="w-[100%]"
            />
          </div>

          {/* //
             subcategories */}

          <p className="font-semibold">Inventory</p>

          <div className="grid grid-cols-2 gap-2">
            <InputWithLabelComponent
              label="Quantity"
              PlaceHolder="Add product name"
              Input
              inputType="number"
            />
            <InputWithLabelComponent
              label="SKU(optional)"
              PlaceHolder="Add product name"
              Input
            />
          </div>
          <p className="font-semibold">Pricing</p>

          <div className="grid grid-cols-4 gap-2">
            <InputWithLabelComponent
              label="price"
              PlaceHolder="Add product name"
              Input
              inputType="number"
            />
            <InputWithLabelComponent
              label="Cost Per Item"
              PlaceHolder="Cost Per Item"
              Input
              inputType="number"
            />
            <InputWithLabelComponent
              label="Discount Price"
              PlaceHolder="Add product name"
              Input
            />
            <InputWithLabelComponent
              label="margin"
              PlaceHolder="Margin"
              Input
              inputCss="bg-[#fff] text-white border-none  "
            />
          </div>

          <p>Tags</p>
          <div className=" relative">
            <InputWithLabelComponent
              PlaceHolder="Add Tag"
              Input
              inputCss="bg-[#f9f9f9]"
            />

            <button className="  p-2 absolute top-[10%] right-3">+</button>
          </div>
          <div className="tags">
            <div className="TagItem min-w-[70px]  flex gap-2 justify-around  border w-fit p-1  rounded-md bg-[#dddddd]  text-black">
              Tag
              <button>x</button>
            </div>
          </div>
        </div>

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
