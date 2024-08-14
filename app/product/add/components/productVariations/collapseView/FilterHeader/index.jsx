import { SortActionComponent } from "@/components/SortComponents/SortAction";
import { GroupByFunction } from "../../variationTables/Filters/GroupBy";
import { GroupedView } from "./GroupByFunction";
import { SortBy } from "./sortByView";
import { FiltersKeys_values } from "./FilterByFUnction";
import { BulkEditView } from "./BulkEdit";
import { memo, useEffect } from "react";
import { produce } from "immer";
import { BulkEditButton } from "./BulkEdit/BUlkeditButton";
import { CheckedComponent } from "./checkedElements/incex";

const FilterHeader = ({
  varitions = [],
  setChecked = () => {},
  checkedArray,
  data,
  setFilters,
  Filters,
  varietnsValues = [],
  setVarients = () => {},
}) => {
  useEffect(() => {
    setChecked([]);
  }, [Filters]);
  return (
    <>
      <div className="header p-3 flex justify-between items-center  mb-1">
        {varitions?.length > 1 ? (
          <GroupedView varitions={varitions} setFilters={setFilters} />
        ) : (<></>        )}
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
      {checkedArray?.length ? (
        <div className="batchedit flex items-center   w-full justify-between">
          <div className="flex items-center gap-2  text-sm ">
            <CheckedComponent
              checkedArray={checkedArray}
              functionToExecute={(checkedArray) =>
                checkedArray?.map((item) => item?.SelectedItems).length
                  ? true
                  : false
              }
              onChange={(e) => {
                setChecked((prev = []) => {
  
                  if(data?.flatMap(item=>item.values).length!==checkedArray.flatMap(item=>item.SelectedItems).length){
            
                    return data?.map((item) => {
                         return {
       key: item?.key,
      SelectedItems: item?.values?.map((i, _idx) => _idx),
    };
  });

 }

     if(prev.flatMap(item=>item.SelectedItems).length){
    return []
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
            <BulkEditView
              checkedArray={checkedArray}
              variants={varitions}
              varitionsValues={varietnsValues}
              setVarients={setVarients}
              data={data}
            />
          </div>
        </div>
      ) : (
        <div className=" grid grid-cols-2 justify-between border-b border-b-[#ddd] pb-2">
      <div className="flex justify-evenly">
      <CheckedComponent
      functionToExecute={(checkedArray)=>checkedArray?.flatMap((item) => item)?.length ? true : false  }
            onChange={(e) => {
              setChecked((prev = []) => {
                const Allitems = data?.map((item) => {
                  return {
                    key: item?.key,
                    SelectedItems: item?.values?.map((i, _idx) => _idx),
                  };
                });
                 ;
                return Allitems;

              });
            }}
          />
          <p className="text-center flex justify-start w-[20.3%] mx-auto ">Varients</p>
  
      </div>
  <div className="flex items-center  justify-around  ">
  <p className="  text-start">Price</p>
  <p className="text-center flex justify-start w-[20.3%]">Quantity</p>
  </div>
        </div>
      )}
    </>
  );
};

export default memo(FilterHeader);
