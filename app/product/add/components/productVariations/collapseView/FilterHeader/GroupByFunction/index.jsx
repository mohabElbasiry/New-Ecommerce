import { produce } from "immer";
import { DropdownMenuRadioGroupSelect } from "../../../variationTables/Filters/DropDown";

export const GroupedView = ({ varitions=[] ,setFilters}) => {
    console.log(varitions,'varitions');
  const ChangeTheOrder = (value) => {
      setFilters(produce(draft=>{
        draft.GroupBy=value

      }))

  };
  return (
    <div className="GroupBy flex items-center  text-sm border w-fit ps-1 rounded-xl ">
      <label id="Grouped" className=" mx-2">Group by</label>
      <DropdownMenuRadioGroupSelect
        list={varitions?.map((item) => item?.key_en)}
        defaultSelected={varitions?.[0]?.key_en}
        handleChange={ChangeTheOrder}
      />
     
    </div>
  );
};
