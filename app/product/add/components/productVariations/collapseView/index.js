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
  REfvariants = [],

  setVarients = () => {},
}) => {
  const [checkedArray, setChecked] = useState([]);
  const [collapsible, setCollapsible] = useState(false);
  const [data, setData] = useState({ data: [] });
  const [open, setOpen] = useState(false);
  const [Filters,setFilters]=useState({
    FilterValues:[],
    GroupBy:'',
    sortBy:{
      sortMethod:'',
      sortKey:''  
    }
  })
   const findSimilarItems = useMemo(() => {
    if (!open && !checkedArray?.length) {
      return [];
    } else {
      return checkedArray.map((selected) => {
        const dataItem = varitionsValues.find(
          (item) => item.key === selected.key
        );

        if (dataItem) {
          const matchedValues = selected.SelectedItems.map(
            (index) => dataItem.values[index]
          ).filter((value) => value !== undefined);
          return { key: selected.key, values: matchedValues };
        } else {
          return { key: selected.key, values: [] };
        }
      });
    }
  }, [checkedArray, varitionsValues, open]);

  const similarItems = findSimilarItems;
   useEffect(() => {
    if (varitions?.length) {
      setData(
        produce((draft) => {
          draft.data = varitionsValues;
        })
      );
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
    [varitionsValues]
  );
  // useMemo(() => {
  //   setVarients(
  //     produce((draft) => {
  //       draft.productvaritions.varitionsValues = varitionsValues.map((item) => {
  //         const prices = item?.values.map((value) => parseFloat(value.price));
  //         const quantity = item?.values?.reduce(
  //           (acc, item) => (acc += +item?.quantity),
  //           0
  //         );
  //         return {
  //           ...item,
  //           min_price: Math.min(...prices),
  //           max_price: Math.max(...prices),
  //           quantity,
  //         };
  //       });
  //     })
  //   );
  // }, [varitionsValues]);
  return (
    <div className="   box p-3 ">
      <FilterHeader
        varitions={REfvariants}
        setChecked={setChecked}
        data={data?.data}
        checkedArray={checkedArray}
        varietnsValues={varitionsValues}
        setVarients={setVarients}
        setFilters={setFilters}
      />
 
      <p onClick={() => setOpen(!open)}>open</p>

      <Accordion
        type="multiple"
        collapsible
        onValueChange={() => setCollapsible(!collapsible)}
      >
        {data?.data?.map((item, idx) => {
          return (
            <AccordionItem key={item?.key} value={item?.key}>
              <VarientKey
                setVarients={setVarients}
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
                        checkedArray={checkedArray}
                        setChecked={setChecked}
                        parentname={item?.key}
                        setVarients={setVarients}
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
