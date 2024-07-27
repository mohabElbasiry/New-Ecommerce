import { SortActionComponent } from "@/components/SortComponents/SortAction";
import { GroupByFunction } from "../../variationTables/Filters/GroupBy";
import { GroupedView } from "./GroupByFunction";
import { SortBy } from "./sortByView";
import { FiltersKeys_values } from "./FilterByFUnction";
import { BulkEditView } from "./BulkEdit";
import { memo } from "react";
import { produce } from "immer";
import { BulkEditButton } from "./BulkEdit/BUlkeditButton";

const FilterHeader = ({
  varitions = [],
  setChecked = () => {},
  checkedArray,
  data,
  setFilters,
  Filters,
  varietnsValues=[],
  setVarients=()=>{}
}) => {
  return (
    <>
      <div className="header p-3 flex justify-between items-center">
        <GroupedView varitions={varitions} setFilters={setFilters} />

        <div className="GroupBy flex items-center  text-sm gap-3">
          <SortBy setFilters={setFilters} />
        </div>
      </div>
      <div className="Filters mb-4">
        <input
          className="p-1 w-full border border-[#ddd] rounded-md"
          type="text"
          placeholder="enter something to search"
          onChange={(e) =>
            setFilters(
              produce((draft) => {
                draft.search = e.target.value;
              })
            )
          }
        />
        <FiltersKeys_values
          varitions={varitions}
          setFilters={setFilters}
          FilterValues={Filters?.FilterValues}
        />
      </div>

      {checkedArray?.[0]?.SelectedItems?.length ? (
        <div className="batchedit flex items-center   w-full justify-between">
          <div className="flex items-center gap-2  text-sm ">
            <input
              id="Selected"
              className="text-center
          w-[30px]
          flex justify-start"
              type="checkbox"
              checked={checkedArray?.map((item) => item?.SelectedItems).length}
              onChange={(e) => {
                setChecked((prev = []) => {
                   const Allitems = data?.map((item) => {
                    return {
                      key: item?.key,
                      SelectedItems: item?.values?.map((i, _idx) => _idx),
                    };
                  });
                  const isEqualIndex =
                    Allitems?.map((item) => item?.SelectedItems).length ===
                    prev?.map((item) => item.SelectedItems).length;
                  if (e.target.checked) {
                    if (!isEqualIndex) {
                      return Allitems;
                    }
                  } else {
                    return [];
                  }
                });
              }}
            />
            <label id="Selected">
              Selected{" "}
              {checkedArray?.flatMap((item) => item?.SelectedItems)?.length}
            </label>
          </div>
          <div className="flex items-center gap-1 w-[]">
            <BulkEditView  checkedArray={checkedArray} variants={varitions} 
       varitionsValues={varietnsValues} setVarients={setVarients} />
          </div>
        </div>
      ) : (
        <div className=" grid grid-cols-4 justify-between">
          <input
            className="text-center
          w-[20px]
          flex justify-start"
            type="checkbox"
            checked={
              checkedArray?.flatMap((item) => item)?.length ? true : false
            }
            onChange={(e) => {
              setChecked((prev = []) => {
                console.log(prev);
                const Allitems = data?.map((item) => {
                  return {
                    key: item?.key,
                    SelectedItems: item?.values?.map((i, _idx) => _idx),
                  };
                });
                const isEqualIndex =
                  Allitems?.map((item) => item?.SelectedItems).length ===
                  prev?.map((item) => item.SelectedItems).length;
                if (e.target.checked) {
                  if (!isEqualIndex) {
                    return Allitems;
                  }
                } else {
                  return [];
                }
              });
            }}
          />
          <p className="text-center flex justify-start w-[20.3%]">Varients</p>
          <p className="text-center flex justify-start w-[20.3%]">Price</p>
          <p className="text-center flex justify-start w-[20.3%]">Quantity</p>
        </div>
      )}
    </>
  );
};

export default memo(FilterHeader);
