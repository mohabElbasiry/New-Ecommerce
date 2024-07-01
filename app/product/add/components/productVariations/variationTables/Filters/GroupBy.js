import { InputWithLabelComponent } from "@/components/inputcomponent";
import { DropdownMenuRadioGroupSelect } from "./DropDown";

export const GroupByFunction = ({
  varitions = [],
  setAutoGenerate = () => {},
  setBeforeFiltered = () => {},
  setOrder = () => {},
}) => {
  function reorderQualitiesByAttribute(prev, desiredAttribute) {
    let SortedVaraitions = [];
    let Founded = varitions?.filter(
      (item) => item?.key_en === desiredAttribute
    );
    let others = varitions?.filter((item) => item?.key_en !== desiredAttribute);

    setOrder((prev) => ({
      ...prev,
      orderVariants: [...Founded, ...others],
    }));

    return prev.map((quality) => {
      const desiredValue = quality.values.find((val) => {
        return val.key_en === desiredAttribute;
      });
      const otherValues = quality.values.filter(
        (val) => val.key_en !== desiredAttribute
      );

      return {
        ...quality,
        values: desiredValue ? [desiredValue, ...otherValues] : otherValues,
      };
    });
  }
  const ChangeTheOrder = (changed) => {
    if (changed !== "") {
      setOrder((prev) => ({ ...prev, changed }));
      console.log(changed, "changed");
      setAutoGenerate((prev) => {
        return reorderQualitiesByAttribute(prev, changed);
      });
      setBeforeFiltered((prev) => reorderQualitiesByAttribute(prev, changed));
    }
  };

  return (
    <div className="GroupBy flex items-center  text-sm gap-3">
      <p>Group by</p>
      <DropdownMenuRadioGroupSelect
        list={varitions?.map((item) => item?.key_en)}
        // defaultSelected={'Grou'}
        handleChange={ChangeTheOrder}
      />
      {/* <InputWithLabelComponent
        Input={false}
        PlaceHolder="Group By"
        inputCss="w-fit !p-1 shadow border border-[#ddd]  "
        selectArray={varitions?.map((item) => item?.key_en)}
        onChange={(e) => ChangeTheOrder(e.target.value)}
      /> */}
    </div>
  );
};
