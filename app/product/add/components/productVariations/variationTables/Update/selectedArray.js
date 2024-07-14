export const SelectedArrayCheckBox = ({
  all = false,
  checkedElements = [],
  setCheckedElements = () => {},
  autoGenerate = [],
  idx = -1,
}) => {
  const CheckBox = (e, idx) => {
    setCheckedElements((prev) => {
      if (e.target.checked) {
        const founded = prev?.find((item) => item === idx);
        console.log(founded, prev, "foundedObject");
        if (founded !== undefined) {
          return prev?.filter((item) => item !== idx);
        } else {
          return [...prev, idx];
        }
      } else {
        return prev?.filter((item) => item !== idx);
      }
    });
  };
  if (all) {
    return (
      <input
        type={"checkbox"}
        onChange={(e) => {
          if (e?.target?.checked) {
            setCheckedElements(autoGenerate?.map((item, idx) => idx));
          } else {
            setCheckedElements([]);
          }
        }}
        checked={checkedElements?.length}
        className="!h-[25px] flex text-[25px] items-center w-[20px] p-3 "
      />
    );
  } else {
    return (
      <input
        type={"checkbox"}
        className="!h-[25px] flex text-[25px] items-center w-[20px] p-3 "
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          e.stopPropagation();
          return CheckBox(e, idx);
        }}
        checked={checkedElements?.some((item) => item === idx)}
      />
    );
  }
};
