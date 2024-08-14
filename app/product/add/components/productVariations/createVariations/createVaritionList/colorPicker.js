import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import './index.css'
export const ColorPicker = ({ index ,handleAction,color_value}) => {
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
  const [sColor,setScolor]=useState(color_value)

  console.log(color_value,'sColor');
  return (
    <>
      <div
        className={`border w-[30px] h-[30px] my-auto rounded-full
          border-[#333]`}
          style={{
            background:color_value,
            border:color_value
          }}
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

      <div className="absolute z-[10000] top-[3rem] right-[100px]"      
         id={'action-component'}
      >
        {color?.index === index && color?.open ?
         <SketchPicker className="colorPicker"  color={sColor}
        onChange={(color)=>{
          setScolor(color.hex)
        }}
       onChangeComplete={(color)=>{
            handleAction({
            type:'updateColor',
            payload:{
              color:color?.hex,
              index,

            }
          })
         }}  /> : null}
      </div>
    </>
  );
};
