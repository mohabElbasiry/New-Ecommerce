import { DropdownMenuRadioGroupSelect } from "../../../variationTables/Filters/DropDown";

 
export const FiltersKeys_values = ({ setFilters=()=>{}, varitions=[] }) => {
  const HandleChangeSelection = (e, key) => {
    console.log(e,key,'asdddddddddddd');
    setFilters((prev = []) => {
      const FoundedItem = prev?.filterByValues?.find((item) => {
        return item?.key === key;
      });

      if (FoundedItem) {
        if (e === "") {
          const FilteredItem = prev?.filterByValues?.filter(
            (item) => item?.key !== key
          );

          return {
            ...prev,
            filterByValues: FilteredItem,
          };
        } else {
          const FilteredItem = prev?.filterByValues?.map((item) => {
            if (item?.key === FoundedItem?.key) {
              return {
                ...item,
                value: e,
              };
            }
            return item;
          });

          return {
            ...prev,
            filterByValues: FilteredItem,
          };
        }
      }

      if (e !== "") {
        return {
          ...prev,
          filterByValues:
            [...(prev?.filterByValues || []), { key, value: e }] ||
            [],
        };
      }
    });
  };
  return (
    <div >
      <p className="text-sm my-2 flex  ">Filter By</p>

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
    </div>
  );
};
 