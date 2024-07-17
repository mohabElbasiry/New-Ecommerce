"use client";
import { memo, useCallback, useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { shapeData } from "./functions/datashape.js";
import VarientKey from "./varientKey/index.js";
import VarientValues from "./varientValues/index.js";
const CollapseView = ({ varitions = [] }) => {
  console.log("render", varitions);
  const [data, setData] = useState({
    Data: [],
    BeforeFilterData: [],
  });
  function generateQualities(prev, attributes) {
    const qualities = [];

    function generateCombinations(currentCombination, depth) {
      if (depth === attributes.length) {
        qualities.push({
          values: currentCombination,
          quantity: 0,
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
  const [checkedArray, setChecked] = useState([]);

  useMemo(() => {
    const items = JSON.parse(localStorage?.getItem("saved"));
    if (items && items?.length) {
      const combinedTexts = generateQualities(items, varitions);
      setData({
        ...data,
        Data: shapeData(combinedTexts, varitions),
        BeforeFilterData: shapeData(combinedTexts, varitions),
      });
      return;
    }

    const combinedTexts = generateQualities([], varitions);
    if (combinedTexts?.length) {
      setData({
        ...data,
        Data: shapeData(combinedTexts),
        BeforeFilterData: shapeData(combinedTexts),
      });
    }
  }, [varitions]);
  const MinAndMax = (values) => {
    const price = values.map((value) => {
      return +value.price;
    });
    return {
      max: Math.max(...price),
      min: Math.min(...price),
    };
  };
  const callculateQUantity = (values) => {
    return values?.reduce((acc, item) => (acc += +item?.quantity), 0);
  };
 
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {data?.Data?.map((item, idx) => {
          return (
            <AccordionItem key={item?.key} value={item?.key}>
              <VarientKey
                setData={setData}
                key={item?.key}
                name={item?.key}
                maxPrice={MinAndMax(item?.values)?.max}
                minPrice={MinAndMax(item?.values)?.min}
                TotalQuantity={callculateQUantity(item?.values)}
                varientsNumbers={item?.values?.length}
                itemIndex={item?.itemIndex}
                setChecked={setChecked}
                selectedArray={item?.values}
                checkedArray={checkedArray}
              />

              {item?.values?.map((valueItem, idx) => {
                return (
                  <VarientValues
                    itemValue={valueItem}
                    parentIndex={item?.itemIndex}
                    idx={idx}
                    setData={setData}
                    checkedArray={checkedArray}
                    setChecked={setChecked}
                    parentname={item?.key}
                  />
                );
              })}
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};
export default memo(CollapseView);
