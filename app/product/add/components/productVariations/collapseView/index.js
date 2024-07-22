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
import DrawerComponent from "@/components/GlobalUi/Drawer/index.jsx";
import VariantDetails from "@/components/VariantDetails/index.jsx";
import { dataVariants } from "@/app/product/[id]/data.js";
import { reorderArray } from "./functions/reorderArray.js";
import { applyFilters } from "./functions/ApplayFilters.js";
const CollapseView = ({
  varitions = [],
  varitionsValues = [],
  REfvariants = [],

  setVarients = () => {},
}) => {
  console.log("rerendertheState");
  const [checkedArray, setChecked] = useState([]);
  const [collapsible, setCollapsible] = useState(false);
  const [data, setData] = useState({ data: [] });
  const [open, setOpen] = useState(false);
  const [Filters, setFilters] = useState({
    search: "",

    FilterValues: [],
    GroupBy: {
      key: "",
      reorderArray: [],
    },
    sortBy: {
      sortMethod: "",
      sortKey: "",
    },
  });
   const findSimilarItems = useMemo(() => {
    if (!open && !checkedArray?.length) {
      return [];
    } else {
      return checkedArray
        .map((selected) => {
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
        })
        .filter((item) => item?.key && item?.values?.length);
    }
  }, [checkedArray, varitionsValues, open]);
  useMemo(() => {

    setFilters(
      produce((draft) => {
        draft.FilterValues = [];
        draft.GroupBy.key = REfvariants[0]?.key_en;
      })
    );
  }, [REfvariants]);
  function sortItemsByQuantity(items, order = "asc", property) {
    let Sorteditems = [];
    if (order === "asc") {
      Sorteditems = items.map((item) => {
        const values = item?.values.sort((a, b) => {
          return +a[property] - +b[property];
        });
        return {
          ...item,
          values,
        };
      });
    } else if (order === "desc") {
      Sorteditems = items?.map((item) => {
        const values = item?.values?.sort(
          (a, b) => +b[property] - +a[property]
        );
        return {
          ...item,
          values,
        };
      });
    } else {
      Sorteditems = items.map((item) => {
        item.values.sort((a, b) => {
          if (order === "asc") {
            return a[property] > b[property] ? 1 : -1;
          } else if (order === "desc") {
            return a[property] < b[property] ? 1 : -1;
          }
        });
        return item;
      });
    }

    return [...Sorteditems];
  }
  useMemo(() => {
    if (varitions?.length) {
      setData(
        produce((draft) => {
          let Editeddata = draft.data;
          if (Filters?.GroupBy?.key !== "") {
            Editeddata = shapeData(
              generateQualities(
                varitionsValues?.flatMap((item) => item?.values),
                reorderArray(varitions, Filters?.GroupBy?.key) || []
              ),
              reorderArray(varitions, Filters?.GroupBy?.key) || []
            );
          }
          if (Filters?.FilterValues?.length) {
            Editeddata = applyFilters(Editeddata, Filters);
          }
          if (Filters?.search !== "") {
            Editeddata = Editeddata?.map((item) => {
              const values = item?.values?.filter((item) => {
                return item?.options?.some(
                  (itemO) =>
                    itemO?.val?.includes(Filters?.search) ||
                    itemO?.key_en?.includes(Filters?.search) ||
                    itemO?.value_en?.includes(Filters?.search)
                );
              });

              return { ...item, values };
            }).filter((item) => item?.values?.length);
          }
          if (Filters?.sortBy?.sortKey !== "") {
            Editeddata = sortItemsByQuantity(
              Editeddata,
              Filters?.sortBy?.sortMethod,
              Filters?.sortBy?.sortKey
            );
          }

          draft.data = Editeddata;
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
        Filters={Filters}
      />

      <p onClick={() => setOpen(!open)}>open</p>

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
                TotalQuantity={callculateQUantity(item?.values)}
                varientsNumbers={item?.values?.length}
                itemIndex={item?.itemIndex}
                setChecked={setChecked}
                selectedArray={item?.values}
                checkedArray={checkedArray}
                parent={item?.parent}
              />
              {console.log(item?.values, "item?.values")}
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
      <DrawerComponent open={open} setOpen={setOpen}>
        <VariantDetails
          data={dataVariants.product.variants}
          similarItems={findSimilarItems}
        />
      </DrawerComponent>
    </div>
  );
};
export default memo(CollapseView);
