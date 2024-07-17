import { SortActionComponent } from "@/components/SortComponents/SortAction";
import { GroupByFunction } from "../../variationTables/Filters/GroupBy";
import { GroupedView } from "./GroupByFunction";
import { SortBy } from "./sortByView";
import { FiltersKeys_values } from "./FilterByFUnction";
import { BulkEditView } from "./BulkEdit";
import { memo } from "react";

  const  FilterHeader= ({
  varitions = [],
  setChecked = () => {},
  checkedArray,
  data,
}) => {
  console.log('renderuseCallback')

  return (
    <>
      <input
        className="p-2 w-full border border-[#ddd] rounded-xl"
        type="text"
        placeholder="enter something to search"
      />
      <div className="header p-3 flex justify-between items-center">
        <GroupedView varitions={varitions} />

        <div className="GroupBy flex items-center  text-sm gap-3">
          <SortBy />
        </div>
      </div>
      <div className="Filters mb-4">
        <FiltersKeys_values varitions={varitions} />
      </div>

      {checkedArray?.[0]?.SelectedItems?.length ? (
        <div className="batchedit flex items-center justify-end  w-full justify-between">
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
          <label id="Selected">
         Selected   {checkedArray?.flatMap(item=>item?.SelectedItems)?.length}
          </label>
        </div>
<div className="flex items-center gap-1 w-[]">

  <button className="box text-sm p-1  ">
    Bulk Edit
  </button>
<BulkEditView />

</div>
        </div>
      ) : (
        <div className=" flex justify-between">
          <input
            className="text-center
          w-[20px]
          flex justify-start"
            type="checkbox"
            checked={checkedArray?.map((item) => item?.SelectedItems).length}
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

export default memo(FilterHeader)