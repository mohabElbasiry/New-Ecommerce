import { DropdownMenuRadioGroupSelect } from "../../../variationTables/Filters/DropDown";

export const GroupedView = ({ varitions=[] }) => {
    console.log(varitions,'varitions');
  const ChangeTheOrder = () => {};
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
