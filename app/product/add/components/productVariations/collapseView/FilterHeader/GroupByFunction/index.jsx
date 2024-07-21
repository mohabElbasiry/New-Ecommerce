import { produce } from "immer";
import { DropdownMenuRadioGroupSelect } from "../../../variationTables/Filters/DropDown";

export const GroupedView = ({ varitions = [], setFilters }) => {
  console.log(varitions, "varitions");
  const reorderArray = (array, key) => {
    // Find the index of the object with the specified key
    const index = array.findIndex((item) => item.key_en === key);
    if (index !== -1) {
      // Remove the object from the array
      const [item] = array.splice(index, 1);
      // Insert the object at the beginning of the array
      array.unshift(item);
    }
    return array;
  };
  const ChangeTheOrder = (value) => {
    setFilters(
      produce((draft) => {
        draft.GroupBy.key = value;
        const copyVariations = [...varitions];
        draft.GroupBy.reorderArray = reorderArray(copyVariations, value);
      })
    );
  };
  return (
    <div className="GroupBy flex items-center  text-sm border w-fit ps-1 rounded-xl ">
      <label id="Grouped" className=" mx-2">
        Group by
      </label>
      <DropdownMenuRadioGroupSelect
        list={varitions?.map((item) => item?.key_en)}
        defaultSelected={varitions?.[0]?.key_en}
        handleChange={ChangeTheOrder}
      />
    </div>
  );
};
