import { produce } from "immer";
import { DropdownMenuRadioGroupSelect } from "../../../variationTables/Filters/DropDown";

export const FiltersKeys_values = ({
  setFilters = () => {},
  varitions = [],
}) => {
  const HandleChangeSelection = (e, key) => {
    setFilters(
      produce((draft) => {
        if (e !== "" && key !== "") {
          const founded = draft?.FilterValues?.find((item) => item?.key === key);
          if (founded) {
            
            draft.FilterValues = draft.FilterValues.map((item) => {
              if (founded.key === item.key) {
                console.log(founded.key, item.key, e, "fadsssssssssss");
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
