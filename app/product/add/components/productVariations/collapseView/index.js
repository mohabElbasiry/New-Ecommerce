"use client";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
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
import { produce } from "immer";
const CollapseView = ({
  varitions = [],
  varitionsValues = [],
  setData = () => {},
  setVarients = () => {},
  data = { Data: {}, BeforeFilterData: {} },
}) => {
  const [checkedArray, setChecked] = useState([]);

  useEffect(() => {
    if (varitions?.length) {
      setData((prev) => {
        return {
          ...prev,
          Data: varitionsValues,
          BeforeFilterData: varitionsValues,
        };
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
  useEffect(() => {
    if (data?.Data?.length) {
      setVarients(
        produce((draft) => {
          draft.productvaritions.referencevarients = data?.Data;
        })
      );
    }
  }, [data]);
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

              {item?.values?.length >= 1 ? (
                <>
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
                </>
              ) : null}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
export default memo(CollapseView);
