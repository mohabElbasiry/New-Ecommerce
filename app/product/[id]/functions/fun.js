"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { variants } from "../data";
export const handleSelectedOptionsStateObj = (options) => {
  let SelectedOptionsStateObj = {};
  options.map(
    (optionItem) =>
      (SelectedOptionsStateObj[optionItem.name] = optionItem.values[0])
  );
  return SelectedOptionsStateObj;
};

export const useSetFieldSearchParams = (selectedOptions, selectedVariant) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    Object.entries(selectedOptions).forEach(([key, value]) => {
      params.set(key, value);
    });
    selectedVariant && selectedVariant.inventory_quantity > 0
      ? router.replace(`${pathname}?${params.toString()}`)
      : null;
  }, [selectedOptions]);
};

export const handleIsSearchParamsValid = (searchParams, options) => {
  const searchParamsEntries = Array.from(searchParams.entries());

  if (searchParamsEntries.length !== options.length) {
    return false;
  }

  return searchParamsEntries.every(([key, value]) => {
    const option = options.find(
      (option) => option.name.toLowerCase() === key.toLowerCase()
    );
    return option && option.values.includes(value);
  });
};

export const handleGetOptionAvailability = (
  optionName,
  value,
  index,
  variants,
  options,
  selectedOptions
) => {
  return variants?.some((variant) => {
    return (
      variant.inventory_quantity > 0 &&
      options.every((option, idx) => {
        if (idx > index) {
          return true; // Skip checks for options after the current one
        }
        if (idx === index) {
          return variant.options[optionName.toLowerCase()] === value;
        }
        return (
          variant.options[option.name.toLowerCase()] ===
          selectedOptions[option.name]
        );
      })
    );
  });
};
export const getUniqueColorsWithHexAndImages = (variants) => {
  const colorMap = new Map();
  const isHaveHux = variants.every((variant) => variant?.color_hex?.length > 0);
  const isHaveImages = variants.every((variant) => variant?.images?.length > 0);
  variants.forEach((variant) => {
    const color = variant.options.color;
    if (color) {
      if (isHaveHux && isHaveImages) {
        if (!colorMap.has(color)) {
          colorMap.set(color, {
            color,
            hex: variant.color_hex,
            images: variant?.images,
          });
        }
      } else if (!isHaveHux && isHaveImages) {
        if (!colorMap.has(color)) {
          colorMap.set(color, {
            color,

            images: variant?.images,
          });
        }
      } else if (isHaveHux && !isHaveImages) {
        if (!colorMap.has(color)) {
          colorMap.set(color, {
            color,
            hex: variant.color_hex,
          });
        }
      }
    }
  });

  return Array.from(colorMap.values());
};

export function generateQualities(prev, attributes) {
  const qualities = [];

  function generateCombinations(currentCombination, depth) {
    if (depth === attributes.length) {
      qualities.push({
        values: currentCombination,
        quantity: 1,
        price: 0,
        image: [],
      });
      return;
    }

    attributes[depth].values.forEach((value) => {
      const newCombination = currentCombination.slice();
      newCombination.push({
        key_en: attributes[depth].key_en,
        key_ar: attributes[depth].key_ar,
        value_en: value.value_en,
        value_ar: value.value_ar,
        color: value.color,
      });
      generateCombinations(newCombination, depth + 1);
    });
  }

  generateCombinations([], 0);

  const AdjustArray = qualities
    .map((item, index) => {
      const Founded = prev.find((item, idx) => idx === index);
      if (Founded) {
        return {
          ...item,
          values: item.values,
          price: Founded.price,
          quantity: Founded.quantity,
          image: Founded?.image,
        };
      }
      return item;
    })
    .map((item, idx) => ({ ...item, itemIndex: idx }));

  return AdjustArray;
}

export function shapeData(combinedTexts) {
  let data = [];

  variants[0].values.forEach((valueGroup, idx) => {
    let obj = {
      key: valueGroup.value_en,
      value: [],
      itemIndex: idx + 1,
      quantity: 0,
      sku: "",
      continue_selling: true,
      price: 0,
      compare_to_price: 0,
      barcode: "",
      images: [],
    };

    combinedTexts.forEach((valueItem, indx) => {
      let check = valueItem.values.some(
        (value) =>
          value.value_en === valueGroup.value_en &&
          value.key_en === variants[0].key_en
      );

      if (check) {
        let str = "";

        valueItem.values.forEach((value) => {
          // if (value.value_en !== valueGroup.value_en) {
          str += value.value_en + "/";
          // }
        });

        obj.value.push({
          itemIndex: `${idx + 1}${indx + 1}`,
          val: str.trim(),
          quantity: valueItem.quantity,
          sku: "",
          continue_selling: true,
          price: 0,
          compare_to_price: 0,
          barcode: "",
          images: [],
        });
      }
    });
    let qty = 0;
    obj.value.map((value) => (qty += value.quantity));
    obj.quantity = qty;
    data.push(obj);
  });

  return data;
}
