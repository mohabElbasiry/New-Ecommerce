"use client";
import { cn } from "@/lib/utils";
import { produce } from "immer";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ChangeImgVariant from "./ChangeImgVariant";

export default function VariantDetails({ data, similarItems = [] }) {



  const  variantsData=   similarItems?.flatMap((variants) => variants?.values)

  const [FilterVariants, setFilterVariants] = useState(
    variantsData
  );
  const [variantSelected, setVariantSelected] = useState(
    variantsData ? variantsData[0] : {}
  );
  useEffect(() => {
    variantsData.length? setVariantSelected(variantsData ? variantsData[0] : {}):null;
  }, []);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      handleCalcProfitMargin(variantSelected?.Cost_Per_Item);
    }, 1200);

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [variantSelected?.Cost_Per_Item, variantSelected?.price]);

  const handleCalcProfitMargin = useCallback(
    (val) => {
      // calculate profit and margin

      let price = variantSelected?.price;
      let Profit = +price - +val;
      let Margin = +(+Profit / +price) * 100;

      setVariantSelected(
        produce((draft) => {
          draft.Profit = val ? Profit?.toFixed() : ``;
          draft.margin = val ? Margin?.toFixed() : ``;
        })
      );
    },
    [variantSelected?.price, variantSelected?.Cost_Per_Item]
  );

const handleSearchFilterVariants=(e) => {
  let val =e.target.value;
  setFilterVariants(variantsData.filter(variant =>variant?.val?.includes(val) ))

}

  return (
    <div className="max-w-7xl mx-auto h-[80vh] overflow-y-auto ">
      <div className="my-10 px-2">{` <- ${variantSelected?.val} `}</div>
      <div className="my-10  px-2 grid gap-10 grid-cols-3 lg:grid-cols-9">
        <div className="col-span-3 relative">
          <div className=" bg-white rounded-lg border-[0.5px] shadow sticky top-5 ">
            <div className="flex p-5 gap-5 border-b ">
              <Image
                src={"/girl.jpg"}
                alt=""
                className="object-contain aspect-square object-top rounded-xl w-24  h-24  border"
                height={120}
                width={120}
              />
              <div className="">
                <div className="flex gap-4 items-center ">
                  <div className="text-sm">Name</div>
                  <div className="bg-green-300/50 text-green-700 rounded text-sm px-2 py-1">
                    Active
                  </div>
                </div>
                <div className="text-gray-600 text-sm">
                  {data?.length} variants{" "}
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-4 p-5">
              <div className="relative">
                <Search className="absolute left-2 top-1/2  -translate-y-1/2" />
                <input className=" border pl-10 h-9 rounded-md "  onChange={handleSearchFilterVariants} type="text" />
              </div>

              <div className="flex gap-2 items-center">
                <div className="text-sm">Sort by</div>
                <select className="border pl-2 h-9 rounded-md ">
                  <option value="">Newest</option>
                  <option value="">Oldest</option>
                  <option value="">Lowest Price</option>
                  <option value="">Highest Price</option>
                </select>
              </div>
            </div>
            <div className="py-5 flex flex-col gap-5  overflow-y-auto h-[calc(100vh-320px)]">
              {FilterVariants?.map((value,index) => (
                <div
                  className={cn(
                    variantSelected?.val == value?.val ? "bg-gray-100" : "",
                    "text-sm flex items-center gap-1 py-1.5 px-5 hover:bg-gray-100/80 cursor-pointer "
                  )}
                  onClick={() => setVariantSelected(value)}
                  key={value?.id}
                >
                  <Image
                    src={"/girl.jpg"}
                    alt=""
                    className="object-contain aspect-square object-top rounded-lg w-12  h-12  border"
                    height={120}
                    width={120}
                  />{" "}
                  {value.val}
                </div>
              ))}
            </div>
          </div>{" "}
        </div>
           <div className="lg:col-span-6 col-span-3  flex flex-col gap-6 ">
        <div className=" bg-white rounded-lg border-[0.5px] shadow p-5">
          <h3 className="font-medium ">Options</h3>
          <div className="flex gap-4 mt-5  flex-col">
            {variantSelected?.options?.map((item, index) => (
             <div className="flex gap-6 flex-wrap" key={index}> <div className="grid gap-2 flex-1" >
                <h4>{item?.key_en}</h4>
                <input
                  className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                  type="text"
                  value={item?.value_en}
                  disabled
                />
              </div>
              {/* <div className="grid gap-2 flex-1" >
                <h4>{item?.key_ar}</h4>
                <input
                  className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                  type="text"
                  value={item?.value_ar}
                  disabled
                />
              </div> */}
              </div>
            ))}
            <div className="flex">
   
              <ChangeImgVariant />
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-lg border-[0.5px] shadow p-5">
          <h3 className="font-medium ">Pricing</h3>
          <div className="flex gap-8 mt-5  flex-col">
            <div className="flex gap-5  flex-wrap">
              <div className="grid gap-2 min-w-60 w-[30%]">
                <h4 className="text-gray-500">Price</h4>
                <input
                  className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setVariantSelected(
                      produce((draft) => {
                        draft.price = e.target.value;
                      })
                    )
                  }
                  value={variantSelected?.price}
                  defaultValue={variantSelected?.price}
                />
              </div>
              <div className="grid gap-2 min-w-60 w-[30%]">
                <h4 className="text-gray-500">Compare-at price</h4>
                <input
                  className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setVariantSelected(
                      produce((draft) => {
                        draft.compare_to_price = e.target.value;
                      })
                    )
                  }
                  value={variantSelected?.compare_to_price}
                  defaultValue={"00.00"}
                />
              </div>
            </div>
            <div className="flex gap-5  flex-wrap">
              <div className="grid gap-2 min-w-60 w-[30%]">
                <h4 className="text-gray-500">Cost per item</h4>
                <input
                  className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setVariantSelected(
                      produce((draft) => {
                        draft.Cost_Per_Item = e.target.value;
                      })
                    )
                  }
                  // value={variantSelected?.Cost||0}
                  defaultValue={variantSelected?.Cost_Per_Item || 0}
                />
              </div>
              <div className="grid gap-2 min-w-60 w-[30%]">
                <h4 className="text-gray-500">Profit</h4>
                <input
                  className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                  type="text"
                  disabled
                  value={
                    variantSelected?.Profit
                      ? `${variantSelected?.Profit}`
                      : "00.00"
                  }
                  defaultValue={
                    variantSelected?.Profit
                      ? `${variantSelected?.Profit}`
                      : "00.00"
                  }
                />
              </div>
              <div className="grid gap-2 min-w-60 w-[30%]">
                <h4 className="text-gray-500">Margin</h4>
                <input
                  className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                  type="text"
                  disabled
                  value={
                    variantSelected?.margin
                      ? `${variantSelected?.margin} %`
                      : "00.00"
                  }
                  defaultValue={
                    variantSelected?.margin
                      ? `${variantSelected?.margin} %`
                      : "00.00"
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-lg border-[0.5px] shadow p-5">
          <h3 className="font-medium ">Inventory</h3>
          <div className="flex gap-8 mt-5  flex-col">
            <div className="flex gap-5  flex-wrap">
              <div className="grid gap-2 min-w-60 w-[45%]">
                <h4 className="text-gray-500">SKU (Stock Keeping Unit)</h4>
                <input
                  className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setVariantSelected(
                      produce((draft) => {
                        draft.sku = e.target.value;
                      })
                    )
                  }
                  defaultValue={variantSelected?.sku}
                />
              </div>
              <div className="grid gap-2 min-w-60 w-[45%]">
                <h4 className="text-gray-500">
                  Barcode (ISBN, UPC, GTIN, etc.)
                </h4>
                <input
                  className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                  type="text"
                  onChange={(e) =>
                    setVariantSelected(
                      produce((draft) => {
                        draft.Barcode = e.target.value;
                      })
                    )
                  }
                  defaultValue={variantSelected?.Barcode}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-lg border-[0.5px] shadow p-5">
          <h3 className="font-medium ">Shipping</h3>
          <div className="flex gap-8 mt-5  flex-col">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">This is a physical product</span>
            </label>
            {isChecked ? (
              <div className="flex gap-5  flex-wrap">
                <div className="grid gap-2 min-w-60 w-[45%]">
                  <h4 className="text-gray-500">Weight</h4>
                  <input
                    className="w-full p-1.5 text-[#333] appearance-none px-3 focus:outline-none border rounded-md"
                    type="text"
                    onChange={(e) =>
                      setVariantSelected(
                        produce((draft) => {
                          draft.Weight = e.target.value;
                        })
                      )
                    }
                    defaultValue={variantSelected?.Weight || 0}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      </div>
   
    </div>
  );
}
