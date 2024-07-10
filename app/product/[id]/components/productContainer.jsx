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
      <h1>{product.title}</h1>
      <p>LE {selectedVariant ? selectedVariant.price : product.price} EGP</p>

      {product.options.map((option, index) => (
        <div key={option.name}>
          <h3>{option.name} : {selectedOptions[option.name] }</h3>
          {option.values.map((value) => {
            const isAvailable = getOptionAvailability(
              option.name,
              value,
              index
            );
            if(option.name=="Color"){
              return (
              <button
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
                key={value}
                onClick={() => handleOptionChange(option.name, value)}
                style={{
                  backgroundColor:
                    selectedOptions[option.name] === value ? "black" : "white",
                  color:
                    selectedOptions[option.name] === value ? "white" : "black",
                  border:
                    selectedOptions[option.name] === value
                      ? "2px solid black"
                      : "1px solid gray",
                  opacity: isAvailable ? 1 : 0.5,
                  cursor: isAvailable ? "pointer" : "not-allowed",
                }}
                // disabled={!isAvailable}
              >
                {value}
              </button>
            );
          })}
        </div>
      ))}

      <button
        onClick={() => console.log("Add to cart")}
        disabled={!selectedVariant || selectedVariant.inventory_quantity === 0}
        className="bg-primary py-5 px-16 m-5 disabled:bg-slate-400"
      >
        Add to cart
      </button>

      {selectedVariant && selectedVariant.inventory_quantity === 0 && (
        <p>Out of stock</p>
      )}
    </div>
  );
};

export default ProductContainer;
