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
  const [checkedArray, setChecked] = useState([]);
  const [data, setData] = useState({ data: [] });

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
    if (varitionsValues?.length) {
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
    (values) => {
      return values?.reduce((acc, item) => (acc += +item?.quantity), 0);
    },
    [varitionsValues]
  );

  return (
    <div className="     p-3 ">
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
