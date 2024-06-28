import { InputWithLabelComponent } from "@/components/inputcomponent";

export const FiltersKeys_values = ({setFilters,varitions}) => {
    const HandleChangeSelection = (e, key) => {
        setFilters((prev) => {
          const FoundedItem = prev?.filterByValues?.find((item) => {
            return item?.key === key;
          });
    
          if (FoundedItem) {
            if (e?.target?.value === "") {
              const FilteredItem = prev?.filterByValues?.filter(
                (item) => item?.key !== key
              );
              console.log(FoundedItem, FilteredItem, key, "FoundedItem");
    
              return {
                ...prev,
                filterByValues: FilteredItem,
              };
            } else {
              const FilteredItem = prev?.filterByValues?.map((item) => {
                if (item?.key === FoundedItem?.key) {
                  return {
                    ...item,
                    value: e?.target?.value,
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
          if (e?.target?.value !== "") {
            return {
              ...prev,
              filterByValues:
                [...prev?.filterByValues, { key, value: e.target.value }] || [],
            };
          }
        });
      };
  return (
    <>
      <p className="text-sm">Filter By</p>

      <div className="grid grid-cols-6 gap-3">
        {varitions?.map((item) => {
          return (
            <InputWithLabelComponent
              Input={false}
              PlaceHolder="Group By"
              inputCss="w-fit !p-1 text-sm !px-1 shadow border border-[#ddd]  "
              defaultSelected={item?.key_en}
              selectArray={item?.values?.map((iv) => {
                return iv?.value_en;
              })}
              onChange={(e) => {
                HandleChangeSelection(e, item?.key_en);
              }}
            />
          );
        })}
      </div>
    </>
  );
};
