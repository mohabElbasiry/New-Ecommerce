"use client";
import React, { useState } from "react";
import ProductContainer from "./components/ProductContainer";
import { dataVariants } from "./data";
import ImagesComponent from "./components/ImagesComponent";
import QuantityInput from "@/components/GlobalUi/QuantityInput";
import Actions from "./components/Actions";
import SliderProducts from "./components/SliderProducts";

export default function ProductDetailsPage({ searchParams }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="bg-white shadow 
      max-w-[50%] mx-auto p-4 grid gap-3 rounded-md w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <ImagesComponent />
        </div>
        <div className="grid py-8 gap-5 md:col-span-1 relative">
          <div>
            <h2>
              <strong>{"product name"}</strong>
            </h2>
            <p className="text-sm text-gray-600">
              aute irure dolor in reprehenderit in voluptate velit es
            </p>
          </div>
          <ProductContainer
            product={dataVariants.product}
            searchParams={searchParams}
          />
          <div className="flex">
            <QuantityInput
              initialQuantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>

          <div className="flex flex-col gap-5">
            <s>00.00 SAR</s>
            <strong>00.00 SAR</strong>
          </div>
          <Actions />
        </div>
      </div>
      <div className="footer">
        <h2>
          <strong>description</strong>
        </h2>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore
        </p>
      </div>
      <div className="flex flex-col justify-center gap-6 py-10 px-10">
        <h1 className="text-2xl text-center font-semibold">
          customer also bought
        </h1>
        <div className="flex justify-center items-center">
          <SliderProducts />
        </div>
      </div>
    </div>
  );
}
