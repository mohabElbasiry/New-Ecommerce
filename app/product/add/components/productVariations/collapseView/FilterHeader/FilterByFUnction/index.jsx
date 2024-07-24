import { produce } from "immer";
import { DropdownMenuRadioGroupSelect } from "../../../variationTables/Filters/DropDown";

export const FiltersKeys_values = ({
  setFilters = () => {},
  varitions = [],
  FilterValues = [],
}) => {
  const HandleChangeSelection = (e, key) => {
    setFilters(
      produce((draft) => {
        if (e !== "" && key !== "") {
          const founded = draft?.FilterValues?.find(
            (item) => item?.key === key
          );
          if (founded) {
            draft.FilterValues = draft.FilterValues.map((item) => {
              if (founded.key === item.key) {
                 return {
                  ...item,
                  value: e,
                };
              }
              return item;
            });
          } else {
            draft.FilterValues.push({ key, value: e });
          }
        }
      })
    );
  };
  // (prev = []) => {

  //   if (e !== "") {
  //     return {
  //       ...prev,
  //       filterByValues:
  //         [...(prev?.filterByValues || []), { key, value: e }] ||
  //         [],
  //     };
  //   }
  // }
  return (
    <div>
      <p className="text-sm my-2 flex  ">Filter By</p>
      {console.log(FilterValues, "FilterValuesFilterValues")}
      <div className="flex gap-3 mt-2">
        {varitions?.map((item) => {
          return (  
            <DropdownMenuRadioGroupSelect
              list={item?.values?.map((iv) => {
                return iv?.value_en;
              })}
              defaultSelected={item?.key_en}
              handleChange={HandleChangeSelection}
            />
          );
        })}
      </div>
      {FilterValues?.length ? (
        <div className="flex gap-3 items-center ml-1   m-2 p-1">
          {FilterValues?.map((item) => {
            return (
              <div className="p-1 rounded h-[20px] flex items-center justify-between overflow-hidden pe-0 gap-3   !text-[12px]  bg-[#eee]
               uppercase border border-[#ddd] my-2 w-fit">
                {item?.value}
                <button type="button" className="bg-[#eee] text-[#333] p-1 " onClick={()=>{
                  setFilters(produce(draft=>{
                    draft.FilterValues=    draft.FilterValues.filter(itemF=>item?.key!==itemF?.key)
                  }))
                }}>x</button>
              </div>
            );
          })}
            <div className="p-1 rounded h-[20px] flex items-center justify-between overflow-hidden pe-0 gap-3   !text-[12px]  bg-[#eee]
               uppercase border border-[#ddd] my-2 w-fit">
                clear All
                <button type="button" className="bg-[#eee] text-[#333] p-1 " onClick={()=>{
                  setFilters(produce(draft=>{
                    draft.FilterValues= []
                  }))
                }}>x</button>
              </div>
        </div>
      ) : null}
    </div>
  );
};
