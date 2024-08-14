"use client";
import { memo, useCallback, useMemo, useState } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { shapeData } from "./functions/datashape.js";
import VarientKey from "./varientKey/index.js";
import VarientValues from "./varientValues/index.js";
import FilterHeader from "./FilterHeader/index.jsx";
import { generateQualities } from "./functions/GenerateQualities.js";
import { produce } from "immer";
import { reorderArray } from "./functions/reorderArray.js";
import { applyFilters } from "./functions/ApplayFilters.js";
import { CustomDialoge } from "@/components/Modal/index.js";
import { EditMoreThanOneValues } from "./editMoreThanOnevalue/index.js";
import Counter from "../RootFunction/Actions.js";
import { UpdateAction } from "../RootFunction/middleWare.js";
const CollapseView = ({
  varitions = [],
  varitionsValues = [],
  REfvariants = [],
  setVarients = () => {},
}) => {
  const [checkedArray, setChecked] = useState([]);
  const [data, setData] = useState({ data: [] });
  const handleAction = (action) => {
    UpdateAction(action, setData);
  };

  const [Filters, setFilters] = useState({
    search: "",
    FilterValues: [],
    GroupBy: { key: "", reorderArray: [] },
    sortBy: {
      sortMethod: "",
      sortKey: "",
    },
  });
  const [editvalue, setEditValue] = useState({
    value: {},
    open: false,
  });
  useMemo(() => {
    setFilters(
      produce((draft) => {
        draft.FilterValues = [];
        draft.GroupBy.key =
          REfvariants?.length > 1 ? REfvariants[0]?.key_en : "";
      })
    );
    setChecked([]);
  }, [REfvariants]);
 
 
  useMemo(() => {
    if (varitionsValues?.length) {

      handleAction({
        type: "FilterData",
        payload: { varitionsValues, Filters, setVarients,varitions  },
      });
       
    } else {
      setData(
        produce((draft) => {
          draft.data = [];
        })
      );
    }
  }, [varitionsValues, Filters]);

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
    (values, key) => {
      setVarients(
        produce((draft) => {
          draft.productvaritions.varitionsValues.forEach((element) => {
            if (element.key === key) {
              element.quantity = element?.values?.reduce(
                (acc, item) => (acc += +item?.quantity),
                0
              );
            }
          });
        })
      );
      return values?.reduce((acc, item) => (acc += +item?.quantity), 0);
    },
    [varitionsValues]
  );

  return (
    <div className="    *: ">
      <FilterHeader
        varitions={REfvariants}
        setChecked={setChecked}
        data={data?.data}
        checkedArray={checkedArray}
        varietnsValues={varitionsValues}
        setVarients={setVarients}
        setFilters={setFilters}
        Filters={Filters}
      />
      <CustomDialoge
        open={editvalue.open}
        setOpen={() => {
          setEditValue(
            produce((draft) => {
              draft.open = !draft.open;
            })
          );
        }}
      >
        <EditMoreThanOneValues
          value={editvalue.value}
          setVarients={setVarients}
          setEditValue={setEditValue}
        />
      </CustomDialoge>
      <Accordion type="multiple" collapsible>
        {data?.data?.map((item, idx) => {
          return (
            <AccordionItem key={item?.key} value={item?.key}>
              <VarientKey
                setVarients={setVarients}
                key={item?.key}
                name={item?.key}
                maxPrice={MinAndMax(item?.values)?.max}
                minPrice={MinAndMax(item?.values)?.min}
                TotalQuantity={callculateQUantity(item?.values, item?.key)}
                varientsNumbers={item?.values?.length}
                itemIndex={item?.itemIndex}
                setChecked={setChecked}
                selectedArray={item?.values}
                checkedArray={checkedArray}
                parent={item?.parent}
                item={item}
              />
              <>
                {item?.values?.map((valueItem, idx) => {
                  return (
                    <VarientValues
                      setEditValue={setEditValue}
                      itemValue={valueItem}
                      parentIndex={item?.itemIndex}
                      idx={idx}
                      checkedArray={checkedArray}
                      setChecked={setChecked}
                      parentname={item?.key}
                      setVarients={setVarients}
                      parentitemIndex={item?.itemIndex}
                    />
                  );
                })}
              </>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
export default memo(CollapseView);
