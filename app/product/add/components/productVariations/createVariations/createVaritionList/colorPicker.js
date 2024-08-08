import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

export const ColorPicker = ({ index }) => {
  const [color, opencolor] = useState({ index: -1, open: false });
  useEffect(() => {
    if (document && open) {
      const searchIcon = document.getElementById("action-component");

      const handleCloseOutside = (e) => {
        if (!searchIcon?.contains(e.target)) {
          opencolor((prev) => ({ ...prev, open: false }));
        }
      };
      const handlePress = (e) => {
        if (e.keyCode === 27) {
          opencolor((prev) => ({ ...prev, open: false }));
        }
      };
      document.addEventListener("keydown", handlePress);
      document.addEventListener("click", handleCloseOutside);
      return () => document.removeEventListener("click", handleCloseOutside);
    }
  }, [color]);
  return (
    <>
      <div
        className={`border w-[30px] h-[30px] my-auto rounded-full border-[#333]`}
        onClick={() => {
          if (index === color?.index && color?.open) {
            opencolor({
              ...color,
              index: index,
              open: false,
            });
          } else {
            opencolor({
              ...color,
              index: index,
              open: true,
            });
          }
        }}
      ></div>

      <div className="absolute z-[10000] top-0 right-[0px]">
        {color?.index === index && color?.open ? <SketchPicker /> : null}
      </div>
    </>
  );
};
