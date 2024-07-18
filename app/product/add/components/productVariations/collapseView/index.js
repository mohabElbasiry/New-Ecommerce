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
import { GroupByFunction } from "../variationTables/Filters/GroupBy.js";
import FilterHeader from "./FilterHeader/index.jsx";
import { generateQualities } from "./functions/GenerateQualities.js";
const CollapseView = ({
  varitions = [],
  varitionsValues = [],
  setData,
  data
}) => {

  const [checkedArray, setChecked] = useState([]);

  useMemo(() => {
    if (varitionsValues?.length&&varitions?.length) {
 
      setData({
        ...data,
        Data: shapeData(varitionsValues, varitions),
        BeforeFilterData: shapeData(varitionsValues, varitions),
      });
    }
  }, [varitionsValues]);
  const MinAndMax = (values) => {
    const price = values.map((value) => {
      return +value.price;
    });
    return {
      max: Math.max(...price),
      min: Math.min(...price),
    };
  };

  const callculateQUantity = useCallback(
    (values) => {
      return values?.reduce((acc, item) => (acc += +item?.quantity), 0);
    },
    [JSON.stringify(varitions)]
  );

  return (
    <div className="   box p-3 ">
      <FilterHeader
        varitions={varitions}
        setChecked={setChecked}
        data={data?.Data}
        checkedArray={checkedArray}
      />
      <Accordion type="single" collapsible className="w-full">
        {data?.Data?.map((item, idx) => {
          console.log(item, "das");
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
                 parent={item?.parent}
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
    </div>
  );
};
export default memo(CollapseView);
