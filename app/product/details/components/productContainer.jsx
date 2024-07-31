"use client";

import React, { useState, useEffect } from "react";
import {  useSearchParams } from "next/navigation";
import { getUniqueColorsWithHexAndImages, handleGetOptionAvailability, handleIsSearchParamsValid, handleSelectedOptionsStateObj, useSetFieldSearchParams } from "../functions/fun";


const ProductContainer = ({ product = {} }) => {
  let SelectedOptionsStateObj =handleSelectedOptionsStateObj(product?.options)

  const searchParams = useSearchParams();
  const initialSelectedOptions = handleIsSearchParamsValid(searchParams,product?.options)
    ? Object.fromEntries(Array.from(searchParams.entries()))
    : SelectedOptionsStateObj;

  const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);

  const selectedVariant = product.variants.find((variant) =>
    Object.entries(selectedOptions).every(
      ([key, value]) => variant.options[key.toLowerCase()] === value
    )
  );
  const handleOptionChange = (optionName, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: value,
    }));
  };
  const getOptionAvailability = (optionName, value, index) => {
    return handleGetOptionAvailability(optionName, value, index,product?.variants,product?.options,selectedOptions)
  };

  useSetFieldSearchParams(selectedOptions, selectedVariant);

  const uniqueColors = getUniqueColorsWithHexAndImages(product.variants);
console.log(uniqueColors);
  return (
    <div>
     
      {product.options.map((option, index) => (
        <div key={option.name}>
        <div className="flex">
          <div   className="px-3 py-1 rounded-2xl bg-[#B0BEC5] my-5 mb-2  flex" >{option.name} </div></div>
          <div className=" flex gap-4 flex-wrap ">
              {option.values.map((value) => {
            const isAvailable = getOptionAvailability(
              option.name,
              value,
              index
            );
            if(option.name=="Color"){
              return (
              <button
              type="button"
                key={value}
                onClick={() => handleOptionChange(option.name, value)}
                style={{ width:40,height:40,borderRadius:"99999px",
                  backgroundColor:uniqueColors.find(ColorObject=>ColorObject?.color==value)?.hex
           
                  ,border:
                    selectedOptions[option.name] === value
                      ? "5px solid black"
                      : "1px solid gray",
                  opacity: isAvailable ? 1 : 0.5,
                  cursor: isAvailable ? "pointer" : "not-allowed",
                  boxShadow:  selectedOptions[option.name] === value
                      ? "0px 0px  20px black"
                      : "0px 0px  5px black",
                }}
               
              >
               
              </button>
            );
            }
            return (
              <button
              type="button"

                key={value}
                onClick={() => handleOptionChange(option.name, value)}
                style={{
                 
                 
                 
                      textDecorationLine:!isAvailable ? "line-through":"none",
                  opacity: isAvailable ? 1 : 0.9,
                  cursor: isAvailable ? "pointer" : "not-allowed",
                }}
                className="px-3 py-1 rounded-2xl bg-[#E0E0E0] "
                // disabled={!isAvailable}
              >
                {value}
              </button>
            );
          })} 
          </div>
       
        </div>
      ))}

   
    </div>
  );
};

export default ProductContainer;
